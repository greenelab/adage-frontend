import React from 'react';
import { useTable } from 'react-table';
import { useSortBy } from 'react-table';

import Field from '../../components/field';
import HorizontalLine from '../../components/horizontal-line';
import { useBbox } from '../../util/hooks.js';

import { ReactComponent as Arrow } from '../../images/arrow.svg';

import './index.css';

const Table = ({ columns, data, defaultSort = [] }) => {
  const [tbodyBbox, tbodyRef] = useBbox();

  columns = columns.map((column) => ({
    Header: column.name,
    accessor: column.value,
    Cell: ({ row, cell }) =>
      column.render ? column.render(row.original) : String(cell.value || '-'),
    width: column.width,
    align: column.align,
    padded: column.padded,
    sortable: column.sortable
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
      data,
      initialState: { sortBy: defaultSort }
    },
    useSortBy
  );

  return (
    <div className='table' {...getTableProps()}>
      <div
        className='thead medium'
        style={{
          width: tbodyBbox ? tbodyBbox.clientWidth - 1 + 'px' : undefined
        }}
      >
        {headerGroups.map((headerGroup, index) => (
          <React.Fragment key={index}>
            <div className='tr' {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <span
                  className='th'
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    width: column.width,
                    justifyContent: column.align
                  }}
                  data-padded={column.padded === false ? false : true}
                  title=''
                  tabIndex={column.sortable === false ? '-1' : '0'}
                  onKeyPress={(event) => {
                    if (
                      column.sortable !== false &&
                      (event.key === 'Enter' || event.key === ' ')
                    )
                      column.toggleSortBy();
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
            <HorizontalLine />
          </React.Fragment>
        ))}
      </div>
      <div className='tbody' {...getTableBodyProps()} ref={tbodyRef}>
        {rows.forEach(prepareRow)}
        {rows.map((row, index, array) => (
          <React.Fragment key={index}>
            <div className='tr' {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <span
                  className='td'
                  {...cell.getCellProps()}
                  data-padded={cell.column.padded === false ? false : true}
                  style={{
                    width: cell.column.width,
                    justifyContent: cell.column.align
                  }}
                >
                  <Field>{cell.render('Cell')}</Field>
                </span>
              ))}
            </div>
            {index < array.length - 1 && <HorizontalLine />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Table;
