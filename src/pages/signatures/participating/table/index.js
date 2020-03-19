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
      isArray(participations) ? JSON.stringify(participations.map((p) => p.weight).sort((a,b) => a-b)) : null
    )}
    {isArray(participations) && (
      <TableComponent
        data={participations}
        columns={[
          {
            name: 'Standard Name',
            value: 'standardName',
            width: '15%',
            render: (cell) => <GeneLink gene={cell} />
          },
          {
            name: 'Systematic Name',
            value: 'systematicName',
            width: '15%'
          },
          {
            name: 'Entrez ID',
            value: 'entrezId',
            width: '15%'
          },
          {
            name: 'Entrez Description',
            value: 'description',
            width: '40%'
          },
          {
            name: 'Weight',
            value: 'weight',
            width: '15%'
          }
        ]}
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
