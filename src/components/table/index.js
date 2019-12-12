import React from 'react';
import { createContext } from 'react';
import { useContext } from 'react';

import Field from '../field';
import HorizontalLine from '../horizontal-line';
import { isBlank } from '../../util/types.js';

import './index.css';

const TableContext = createContext({});

const Table = ({ ...props }) => (
  <div className='table'>
    <TableContext.Provider value={props}>
      <Head />
      <HorizontalLine />
      <Body />
    </TableContext.Provider>
  </div>
);

export default Table;

const Head = () => {
  const table = useContext(TableContext);
  return (
    <div className='table_head'>
      {table.head.map((key, index) => (
        <div
          key={index}
          style={{ width: table.widths[index] }}
          data-align={table.aligns[index] || ''}
          className='table_cell semibold'
        >
          <Field wrap>{key}</Field>
        </div>
      ))}
    </div>
  );
};

const Body = () => {
  const table = useContext(TableContext);
  return (
    <div className='table_body'>
      {table.data.map((datum, index, array) => (
        <React.Fragment key={index}>
          <Row datum={datum} />
          {index < array.length - 1 && <HorizontalLine />}
        </React.Fragment>
      ))}
    </div>
  );
};

const Row = ({ datum }) => {
  const table = useContext(TableContext);

  return (
    <div className='table_body_row'>
      {table.fields.map((key, index) => (
        <div
          key={index}
          style={{ width: table.widths[index] }}
          data-align={table.aligns[index] || ''}
          className='table_cell'
        >
          <Field>{isBlank(datum[key]) ? '-' : datum[key]}</Field>
        </div>
      ))}
    </div>
  );
};
