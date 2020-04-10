import React from 'react';
import { connect } from 'react-redux';

import TableComponent from '../../../../components/table';
import Clickable from '../../../../components/clickable';
import { toExponential } from '../../../../util/string';

import './index.css';

let Table = ({ enrichedGenes }) => (
  <TableComponent
    data={enrichedGenes}
    columns={[
      {
        name: 'Name',
        key: 'name',
        render: ({ cell, row }) => <Clickable text={cell} to={row.url} link />,
        width: '30%'
      },
      {
        name: 'Database',
        key: 'dbase',
        render: ({ cell, row }) => <Clickable text={cell} to={row.url} link />,
        width: '20%'
      },
      {
        name: 'p Value',
        key: 'pValue',
        render: ({ cell }) => toExponential(cell),
        width: '10%',
        align: 'center'
      },
      {
        name: 'Genes',
        key: 'genes',
        value: ({ cell }) => cell.length,
        render: ({ cell }) => (
          <span className='nowrap'>
            {cell.map((cell) => cell.name).join(' ')}
          </span>
        ),
        width: '40%'
      }
    ]}
    defaultSortKey='pValue'
    defaultSortUp={false}
    freezeCol={false}
  />
);

const mapStateToProps = (state) => ({
  enrichedGenes: state.signatures.enrichedGenes
});

Table = connect(mapStateToProps)(Table);

export default Table;
