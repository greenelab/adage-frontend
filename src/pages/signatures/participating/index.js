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

export const mapParticipations = (state) =>
  isArray(state.signatures.participations) && isArray(state.genes.list) ?
    state.signatures.participations.map((participation) => ({
      ...(state.genes.list.find((gene) => gene.id === participation.gene) ||
          {}),
      weight: participation.weight
    })) :
    state.signatures.participations;
