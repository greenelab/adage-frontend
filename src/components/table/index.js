import React from 'react';
import { useTable } from 'react-table';
import { useSortBy } from 'react-table';

import Field from '../../components/field';

import { ReactComponent as Arrow } from '../../images/arrow.svg';

import './index.css';

const Table = ({ columns, data }) => {
  columns = columns.map((column) => ({
    Header: column.name,
    accessor: column.accessor,
    width: column.width,
    align: column.align
  }));

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data
    },
    useSortBy
  );

  return (
    <div className='table' {...getTableProps()}>
      <div className='thead'>
        {headerGroups.map((headerGroup) => (
          <div className='tr' {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <span
                className='th'
                {...column.getHeaderProps(column.getSortByToggleProps())}
                style={{
                  width: column.width,
                  justifyContent: column.align
                }}
              >
                <Field>{column.render('Header')}</Field>
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <Arrow className='rotate_ccw' />
                  ) : (
                    <Arrow className='rotate_cw' />
                  )
                ) : (
                  ''
                )}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className='tbody' {...getTableBodyProps()}>
        {rows.forEach(prepareRow)}
        {rows.map((row) => (
          <div className='tr' {...row.getRowProps()}>
            {row.cells.map((cell, index) => (
              <span
                className='td'
                {...cell.getCellProps()}
                style={{
                  width: cell.column.width,
                  justifyContent: cell.column.align
                }}
              >
                <Field>{cell.render('Cell')}</Field>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
