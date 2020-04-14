import React from 'react';
import { connect } from 'react-redux';

import FetchAlert from '../../../components/fetch-alert';
import Table from './table';
import Controls from './controls';
import { isString } from '../../../util/types';
import { isArray } from '../../../util/types';

import './index.css';

// signature activities section

let Activities = ({ activities }) => (
  <>
    {isString(activities) && (
      <FetchAlert status={activities} subject='activities' />
    )}
    {isArray(activities) && (
      <>
        <Table />
        <Controls />
      </>
    )}
  </>
);

const mapStateToProps = (state) => ({
  activities: state.signatures.activities
});

Activities = connect(mapStateToProps)(Activities);

export default Activities;

export const mapActivities = (activities, state) => {
  if (
    !isArray(activities) ||
    !activities.length ||
    !isArray(state.experiments.list) ||
    !state.experiments.list.length
  )
    return { bySignature: {}, byExperiment: [] };

  // get all activities in signature, and min/max
  const values = activities.map((activity) => activity.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const bySignature = { values, min, max };

  // get activities by experiment
  const byExperiment = state.experiments.list
    .map((experiment) => {
      // get experiment samples info
      const samples = experiment.samples.map((sample) => ({
        ...sample,
        value: activities.find((activity) => activity.sample === sample.id)
          ?.value
      }));
      // get activity value of each sample
      const values = samples
        .map((sample) => sample.value)
        .filter((value) => value);
      // get min/max/range of values
      const min = Math.min(...values);
      const max = Math.max(...values);
      const range = max - min;
      // return all needed info
      return {
        accession: experiment.accession,
        values,
        count: values.length,
        min,
        max,
        range,
        samples
      };
    })
    .filter((experiment) => experiment.count);

  return { bySignature, byExperiment };
};
