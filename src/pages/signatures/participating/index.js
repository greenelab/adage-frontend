import React from 'react';
import { connect } from 'react-redux';

import FetchAlert from '../../../components/fetch-alert';
import { isString } from '../../../util/types';
import { isArray } from '../../../util/types';
import Details from './details';
import Table from './table';
import Controls from './controls';

import './index.css';

// selected signature section

let Selected = ({ participations }) => (
  <>
    {isString(participations) && (
      <FetchAlert status={participations} subject='participating genes' />
    )}
    {isArray(participations) && (
      <>
        <Details />
        <Table />
        <Controls />
      </>
    )}
  </>
);

const mapStateToProps = (state) => ({
  participations: state.signatures.participations
});

Selected = connect(mapStateToProps)(Selected);

export default Selected;

export const mapParticipations = (state) => {
  if (!isArray(state.signatures.participations) || !isArray(state.genes.list))
    return state.signatures.participations;

  // bring gene list into map by id
  const geneMap = {};
  for (const { id, ...rest } of state.genes.list) geneMap[id] = { id, ...rest };

  return state.signatures.participations.map((participation) => ({
    ...(geneMap[participation.gene] || {}),
    weight: participation.weight
  }));
};
