import React from 'react';
import { connect } from 'react-redux';

import TableComponent from '../../../../components/table';
import GeneLink from '../../../gene/link';
import { mapParticipations } from '..';

import './index.css';

// table of enriched signatures for selected genes

let Table = ({ participations }) => (
  <TableComponent
    data={participations}
    columns={[
      {
        name: 'Standard Name',
        key: 'standardName',
        render: ({ row }) => <GeneLink gene={row} />,
        width: '15%'
      },
      {
        name: 'Systematic Name',
        key: 'systematicName',
        width: '15%'
      },
      {
        name: 'Entrez ID',
        key: 'entrezId',
        width: '15%'
      },
      {
        name: 'Entrez Description',
        key: 'description',
        width: '40%'
      },
      {
        name: 'Weight',
        key: 'weight',
        width: '15%',
        render: ({ cell }) => cell.toFixed(5)
      }
    ]}
    defaultSortKey='weight'
    defaultSortUp={true}
    freezeCol={false}
  />
);

const mapStateToProps = (state) => ({
  participations: mapParticipations(state)
});

Table = connect(mapStateToProps)(Table);

export default Table;
