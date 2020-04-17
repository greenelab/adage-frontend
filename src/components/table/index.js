import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { InView } from 'react-intersection-observer';
import 'intersection-observer'; // polyfill for ios

import HorizontalLine from '../../components/horizontal-line';
import { isNumber } from '../../util/types';
import { isInteger } from '../../util/types';
import { isObject } from '../../util/types';
import { isFunction } from '../../util/types';

import { ReactComponent as ArrowIcon } from '../../images/arrow.svg';

import './index.css';

// table component
// columns - [{name, value, render, width, align, padded}]
//   name - name to display in column header
//   key - key of the row object that is considered the cell
//   value - value to use for sorting. assumed to be key if not a function
//   render - component to use for rendering cell
//   width - css width of column
//   align - css flex justify-content value
//   padded - whether or not to pad cell
// data - []
// minWidth - string
// defaultSort - [{ id, desc }]
// sortable - boolean
// highlightedIndex - integer

const precision = 3;

const Table = ({
  columns,
  data,
  minWidth = '300px',
  defaultSortKey = null,
  defaultSortUp = null,
  sortable = true,
  freezeRow = true,
  freezeCol = true,
  highlightedIndex
}) => {
  // internal state
  const [sortKey, setSortKey] = useState(defaultSortKey);
  const [sortUp, setSortUp] = useState(defaultSortUp);

  // when default sort key changes, set sort key
  // useful for when different table renders in place of old one
  useEffect(() => setSortKey(defaultSortKey), [defaultSortKey]);

  // on clicking sort button
  const onClick = useCallback(
    (key) => {
      if (sortKey !== key) {
        setSortKey(key);
        setSortUp(false);
      } else if (sortUp === false)
        setSortUp(true);
      else {
        setSortKey(null);
        setSortUp(null);
      }
    },
    [sortKey, sortUp]
  );

  // scroll highlighted row into view
  useEffect(() => {
    const element = document.querySelector('*[data-shade="true"]');
    if (element)
      element.scrollIntoView({ block: 'center' });
  });

  // sort compare function
  const compare = useCallback(
    (a, b) => {
      a = Number(a) || a;
      b = Number(b) || b;
      if (a > b)
        return sortUp ? -1 : 1;
      else if (a < b)
        return sortUp ? 1 : -1;
      else
        return 0;
    },
    [sortUp]
  );

  // get final table data to display
  const table = useMemo(() => {
    if (sortKey === null || sortUp === null)
      return [...data];

    const value = (columns.find((column) => column.key === sortKey) || {})
      .value;

    let sortFunc;
    if (isFunction(value)) {
      sortFunc = (a, b) => {
        a = a[sortKey];
        b = b[sortKey];
        a = value({ cell: a });
        b = value({ cell: b });
        return compare(a, b);
      };
    } else {
      sortFunc = (a, b) => {
        a = a[sortKey];
        b = b[sortKey];
        return compare(a, b);
      };
    }

    return [...data].sort(sortFunc);
  }, [columns, compare, data, sortKey, sortUp]);

  return (
    <div
      className='table'
      data-sortable={sortable}
      data-freeze-row={freezeRow}
      data-freeze-col={freezeCol}
    >
      <Head
        columns={columns}
        minWidth={minWidth}
        sortable={sortable}
        sortKey={sortKey}
        sortUp={sortUp}
        onClick={onClick}
      />
      <Body
        table={table}
        columns={columns}
        minWidth={minWidth}
        highlightedIndex={highlightedIndex}
      />
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  minWidth: PropTypes.string,
  sortable: PropTypes.bool,
  freezeRow: PropTypes.bool,
  freezeCol: PropTypes.bool,
  highlightedIndex: PropTypes.number
};

export default Table;

// thead
const Head = ({ columns, minWidth, sortable, sortKey, sortUp, onClick }) => (
  <div className='thead weight_medium' style={{ minWidth }}>
    <div className='tr'>
      {columns.map((column, index) => (
        <HeadCell
          key={index}
          sortable={sortable}
          sortKey={sortKey}
          sortUp={sortUp}
          column={column}
          onClick={onClick}
        />
      ))}
    </div>
    <HorizontalLine />
  </div>
);

// th
const HeadCell = ({ sortable, sortKey, sortUp, column, onClick }) => (
  <button
    className='th'
    style={{
      width: column.width,
      justifyContent: column.align
    }}
    data-padded={column.padded === false ? false : true}
    title=''
    onClick={() => onClick(column.key)}
    disabled={!sortable}
    aria-label=''
    data-tooltip-h-align={column.align === 'center' ? 'center' : undefined}
  >
    <span className='nowrap'>{column.name}</span>
    {sortKey !== null && column.key && sortKey === column.key ? (
      sortUp ? (
        <ArrowIcon className='rotate_ccw' />
      ) : (
        <ArrowIcon className='rotate_cw' />
      )
    ) : (
      ''
    )}
  </button>
);

// tbody
const Body = ({ table, columns, minWidth, highlightedIndex }) => (
  <div className='tbody' style={{ minWidth }}>
    {table.map((row, index) => (
      <BodyRow
        key={index}
        columns={columns}
        row={row}
        highlightedIndex={highlightedIndex}
        index={index}
      />
    ))}
  </div>
);

// tr
const BodyRow = ({ columns, row, highlightedIndex, index }) => (
  <>
    <InView triggerOnce>
      {({ inView, ref }) => (
        <div ref={ref} className='tr' data-shade={index === highlightedIndex}>
          {inView &&
            columns.map((column, index) => (
              <BodyCell key={index} row={row} column={column} />
            ))}
        </div>
      )}
    </InView>
    <HorizontalLine />
  </>
);

// td
const BodyCell = ({ row, column }) => {
  const cell = row[column.key];
  // render cell contents
  let contents = cell;
  // if col has a render function, use it
  if (column.render)
    contents = column.render({ row, column, cell });
  // if value is number, fix it to decimal points
  if (isNumber(contents) && !isInteger(contents))
    contents = contents.toFixed(precision);
  // if value returned from render function not a react object
  if (!isObject(contents))
    contents = <span className='nowrap'>{contents}</span>;

  return (
    <span
      className='td'
      data-highlight={column.key === row.highlightedField}
      data-padded={column.padded === false ? false : true}
      aria-label=''
      data-tooltip-h-align={column.align === 'center' ? 'center' : undefined}
      style={{
        width: column.width,
        justifyContent: column.align
      }}
    >
      {contents}
    </span>
  );
};
