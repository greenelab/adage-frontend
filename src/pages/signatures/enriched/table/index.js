import React from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';

import TableComponent from '../../../../components/table';
import Clickable from '../../../../components/clickable';
import GeneLink from '../../../gene/link';
import { toPValue } from '../../../../util/string';

import './index.css';

let Table = ({ enrichedGenes }) => (
  <TableComponent
    data={enrichedGenes}
    columns={[
      {
        name: 'Name',
        key: 'name',
        render: ({ cell, row }) => <Clickable text={cell} to={row.url} link />,
        width: '15%'
      },
      {
        name: 'Database',
        key: 'database',
        render: ({ cell, row }) => <Clickable text={cell} to={row.url} link />,
        width: '5%'
      },
      {
        name: 'p-value',
        key: 'pValue',
        render: ({ cell }) => toPValue(cell),
        width: '5%',
        align: 'center'
      },
      {
        name: 'Genes',
        key: 'genes',
        value: ({ cell }) => cell.length,
        render: ({ cell }) =>
          cell.map((gene, index) => (
            <Fragment key={index}>
              <GeneLink gene={gene} />{' '}
            </Fragment>
          )),
        width: '75%'
      }
    ]}
    minWidth='2000px'
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
