import React, { useContext } from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useRef } from 'react';
import { useCallback } from 'react';
import { InView } from 'react-intersection-observer';
import PropTypes from 'prop-types';
import 'intersection-observer'; // polyfill for ios

import HorizontalLine from '../../components/horizontal-line';
import { useDiff } from '../../util/hooks';
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
// onSort - func

const precision = 3;

const TableContext = createContext({});

const Table = ({
  columns,
  data,
  minWidth = '300px',
  defaultSortKey = null,
  defaultSortUp = null,
  sortable = true,
  freezeRow = true,
  freezeCol = true,
  highlightedIndex,
  onSort = () => null
}) => {
  // internal state
  const [sortKey, setSortKey] = useState(defaultSortKey);
  const [sortUp, setSortUp] = useState(defaultSortUp);
  const ref = useRef();
  onSort = useCallback(onSort, [onSort]);

  // when default sort key changes, set sort key
  // useful for when different table renders in place of old one
  useEffect(() => setSortKey(defaultSortKey), [defaultSortKey]);

  // on clicking sort button
  const changeSort = useCallback(
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
    if (sortKey === null || sortUp === null) {
      const newData = [...data];
      return newData;
    }

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

    const newData = [...data].sort(sortFunc);
    return newData;
  }, [columns, compare, data, sortKey, sortUp]);

  // get table rows between indexes
  const getRange = useCallback(
    (start = 0, end = table.length) => {
      if (start > end)
        [start, end] = [end, start];
      return table.slice(start, end + 1);
    },
    [table]
  );

  const root = ref?.current;

  const tableDiff = useDiff(table);
  useEffect(() => {
    if (tableDiff)
      onSort(table);
  }, [onSort, table, tableDiff]);

  return (
    <TableContext.Provider
      value={{
        table,
        columns,
        root,
        sortable,
        sortKey,
        sortUp,
        minWidth,
        highlightedIndex,
        changeSort,
        getRange
      }}
    >
      <div
        ref={ref}
        className='table'
        data-sortable={sortable}
        data-freeze-row={freezeRow}
        data-freeze-col={freezeCol}
      >
        <Head />
        <Body />
      </div>
    </TableContext.Provider>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  minWidth: PropTypes.string,
  sortable: PropTypes.bool,
  freezeRow: PropTypes.bool,
  freezeCol: PropTypes.bool,
  highlightedIndex: PropTypes.number,
  onSort: PropTypes.func
};

export default Table;

// thead
const Head = () => {
  const { columns, minWidth } = useContext(TableContext);

  return (
    <div className='thead weight_medium' style={{ minWidth }}>
      <div className='tr'>
        {columns.map((column, index) => (
          <HeadCell key={index} column={column} />
        ))}
      </div>
      <HorizontalLine />
    </div>
  );
};

// th
const HeadCell = ({ column }) => {
  const { key, name, width, align, padded } = column;
  const { sortable, sortKey, sortUp, changeSort } = useContext(TableContext);

  let arrow = '';
  if (sortKey !== null && key && sortKey === key)
    arrow = <ArrowIcon className={sortUp ? 'rotate_ccw' : 'rotate_cw'} />;

  return (
    <button
      className='th'
      style={{
        width,
        justifyContent: align
      }}
      data-padded={padded === false ? false : true}
      title=''
      onClick={() => changeSort(key)}
      disabled={!sortable}
      aria-label=''
      data-tooltip-h-align={align === 'center' ? 'center' : undefined}
    >
      <span className='nowrap'>{name}</span>
      {arrow}
    </button>
  );
};

// tbody
const Body = () => {
  const { table, minWidth } = useContext(TableContext);

  return (
    <div className='tbody' style={{ minWidth }}>
      {table.map((row, rowIndex) => (
        <BodyRow key={rowIndex} row={row} rowIndex={rowIndex} />
      ))}
    </div>
  );
};

// tr
const BodyRow = ({ row, rowIndex }) => {
  const { columns, root, highlightedIndex } = useContext(TableContext);

  return (
    <>
      <InView root={root} rootMargin='60px' triggerOnce>
        {({ inView, ref }) => (
          <div
            ref={ref}
            className='tr'
            data-shade={rowIndex === highlightedIndex}
          >
            {inView &&
              columns.map((column, columnIndex) => (
                <BodyCell
                  key={columnIndex}
                  row={row}
                  column={column}
                  rowIndex={rowIndex}
                  columnIndex={columnIndex}
                />
              ))}
          </div>
        )}
      </InView>
      <HorizontalLine />
    </>
  );
};

// td
const BodyCell = ({ row, column, rowIndex, columnIndex }) => {
  const { getRange } = useContext(TableContext);
  const { key, width, align, padded, render } = column;
  const { highlightedField } = row;

  const cell = row[key];
  // render cell contents
  let contents = cell;
  // if col has a render function, use it
  if (render)
    contents = render({ row, column, cell, rowIndex, columnIndex, getRange });
  // if value is number, fix it to decimal points
  if (isNumber(contents) && !isInteger(contents))
    contents = contents.toFixed(precision);
  // if value returned from render function not a react object
  if (!isObject(contents))
    contents = <span className='nowrap'>{contents}</span>;

  return (
    <span
      className='td'
      data-highlight={key === highlightedField}
      data-padded={padded === false ? false : true}
      aria-label=''
      data-tooltip-h-align={align === 'center' ? 'center' : undefined}
      style={{
        width,
        justifyContent: align
      }}
    >
      {contents}
    </span>
  );
};
