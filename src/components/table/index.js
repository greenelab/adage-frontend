import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { InView } from 'react-intersection-observer';
import 'intersection-observer'; // polyfill for ios

import HorizontalLine from '../../components/horizontal-line';

import { ReactComponent as ArrowIcon } from '../../images/arrow.svg';

import './index.css';
import { isFunction } from '../../util/types';

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
// defaultSort - [{ id, desc }]
// sortable - boolean
// highlightedIndex - integer

const Table = ({
  columns,
  data,
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

  const compare = useCallback(
    (a, b) => {
      if (a > b)
        return sortUp ? -1 : 1;
      else if (a < b)
        return sortUp ? 1 : -1;
      else
        return 0;
    },
    [sortUp]
  );

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
        sortable={sortable}
        sortKey={sortKey}
        sortUp={sortUp}
        onClick={onClick}
      />
      <Body
        table={table}
        highlightedIndex={highlightedIndex}
        columns={columns}
      />
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  sortable: PropTypes.bool,
  freezeRow: PropTypes.bool,
  freezeCol: PropTypes.bool,
  highlightedIndex: PropTypes.number
};

export default Table;

const Head = ({ columns, sortable, sortKey, sortUp, onClick }) => (
  <div className='thead medium'>
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
  >
    <span className='nowrap' aria-label=''>
      {column.name}
    </span>
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

const Body = ({ table, columns, highlightedIndex }) => (
  <div className='tbody'>
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

const BodyRow = ({ columns, row, highlightedIndex, index }) => (
  <>
    <InView>
      {({ inView, ref }) => (
        <div className='tr' ref={ref} data-shade={index === highlightedIndex}>
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

const BodyCell = ({ row, column }) => {
  const cell = row[column.key];
  // render cell contents
  let contents;
  if (column.render)
    contents = column.render({ row, column, cell });
  else {
    contents = (
      <span className='nowrap' aria-label=''>
        {cell}
      </span>
    );
  }

  return (
    <span
      className='td'
      data-highlight={column.key === row.highlightedField}
      data-padded={column.padded === false ? false : true}
      style={{
        width: column.width,
        justifyContent: column.align
      }}
    >
      {contents}
    </span>
  );
};
