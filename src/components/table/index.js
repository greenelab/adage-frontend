import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Fragment } from 'react';
import { useTable } from 'react-table';
import { useSortBy } from 'react-table';

import HorizontalLine from '../../components/horizontal-line';
import { cleanValue } from '../../util/object';

import { ReactComponent as ArrowIcon } from '../../images/arrow.svg';

import './index.css';

// table component
// columns - [{name, value, render, width, align, padded}]
//   name - name to display in column header
//   value - value to use for sorting cell
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
  defaultSort = [],
  sortable = true,
  freeze = true,
  highlightedIndex
}) => {
  // map friendly names to rc-table names
  columns = columns.map((column) => ({
    Header: column.name,
    accessor: column.value,
    customRender: column.render ? true : false,
    Cell: ({ row, cell }) =>
      column.render ? column.render(row.original) : String(cell.value),
    width: column.width,
    align: column.align,
    padded: column.padded
  }));

  // init table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      initialState: { sortBy: defaultSort },
      disableSortBy: !sortable
    },
    useSortBy
  );

  // scroll highlighted row into view
  useEffect(() => {
    const element = document.querySelector('*[data-shade="true"]');
    if (element)
      element.scrollIntoView({ block: 'nearest' });
  });

  return (
    <div
      {...getTableProps()}
      className='table'
      data-sortable={sortable}
      data-freeze={freeze}
    >
      <div className='thead medium'>
        {headerGroups.map((headerGroup, index) => (
          <Fragment key={index}>
            <div {...headerGroup.getHeaderGroupProps()} className='tr'>
              {headerGroup.headers.map((column) => (
                <span
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className='th'
                  style={{
                    width: column.width,
                    justifyContent: column.align
                  }}
                  data-padded={column.padded === false ? false : true}
                  title=''
                  tabIndex={sortable ? '0' : '-1'}
                  onKeyPress={(event) => {
                    if (
                      column.sortable !== false &&
                      (event.key === 'Enter' || event.key === ' ')
                    )
                      column.toggleSortBy();
                  }}
                >
                  <span className='nowrap' aria-label=''>
                    {column.render('Header')}
                  </span>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <ArrowIcon className='rotate_ccw' />
                    ) : (
                      <ArrowIcon className='rotate_cw' />
                    )
                  ) : (
                    ''
                  )}
                </span>
              ))}
            </div>
            <HorizontalLine />
          </Fragment>
        ))}
      </div>
      <div {...getTableBodyProps()} className='tbody'>
        {rows.forEach(prepareRow)}
        {rows.map((row, index, array) => (
          <Fragment key={index}>
            <div
              {...row.getRowProps()}
              className='tr'
              data-shade={index === highlightedIndex}
            >
              {row.cells.map((cell) => {
                // render cell contents
                let contents = cell.render('Cell');

                // if cell value not component, make dash if blank
                if (cleanValue(cell.value) === '-' && !cell.column.customRender)
                  contents = '-';

                // if cell value not component, wrap in Field
                if (!cell.column.customRender) {
                  contents = (
                    <span className='nowrap' aria-label=''>
                      {contents}
                    </span>
                  );
                }

                return (
                  <span
                    {...cell.getCellProps()}
                    className='td'
                    data-highlight={
                      cell.column.id === row.original.highlightedField
                    }
                    data-padded={cell.column.padded === false ? false : true}
                    style={{
                      width: cell.column.width,
                      justifyContent: cell.column.align
                    }}
                  >
                    {contents}
                  </span>
                );
              })}
            </div>
            {index < array.length - 1 && <HorizontalLine />}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  sortable: PropTypes.bool,
  freeze: PropTypes.bool,
  highlightedIndex: PropTypes.number
};

export default Table;
