import React from 'react';
import { connect } from 'react-redux';

import TableComponent from '../../../../components/table';
import FetchAlert from '../../../../components/fetch-alert';
import GeneLink from '../../../gene/link';
import { isString } from '../../../../util/types';
import { isArray } from '../../../../util/types';

import './index.css';

// table of enriched signatures for selected genes

let Table = ({ participations }) => (
  <>
    {isString(participations) && (
      <FetchAlert status={participations} subject="participating genes" />
    )}
    {console.log(
      isArray(participations) ?
        JSON.stringify(
          participations.map((p) => p.weight).sort((a, b) => a - b)
        ) :
        null
    )}
    {isArray(participations) && (
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
            width: '15%'
          }
        ]}
        defaultSortKey="weight"
        defaultSortUp={false}
        freezeCol={false}
      />
    )}
  </>
);

const mapStateToProps = (state) => ({
  participations:
    isArray(state.signatures.participations) && isArray(state.genes.list) ?
      state.signatures.participations.map((participation) => {
        const gene = state.genes.list.find(
          (gene) => gene.id === participation.gene
        );
        return {
          standardName: gene?.standardName,
          systematicName: gene?.systematicName,
          entrezId: gene?.entrezId,
          description: gene?.description,
          weight: participation.weight
        };
      }) :
      state.signatures.participations
});

Table = connect(mapStateToProps)(Table);

export default Table;
