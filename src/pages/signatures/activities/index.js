import React from 'react';
import { connect } from 'react-redux';

import FetchAlert from '../../../components/fetch-alert';
import Table from './table';
import { isString } from '../../../util/types';
import { isArray } from '../../../util/types';

import './index.css';

// signature activities section

let Activities = ({ activities }) => (
  <>
    {isString(activities) && (
      <FetchAlert status={activities} subject='activities' />
    )}
    {isArray(activities) && <Table />}
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
    return activities;

  const allValues = activities.map((activity) => activity.value);
  return state.experiments.list
    .map((experiment) => {
      const samples = experiment.samples.map((sample) => sample.id);
      const values = activities
        .filter((activity) => samples.includes(activity.sample))
        .map((activity) => activity.value);
      const min = Math.min(...values);
      const max = Math.max(...values);
      const range = max - min;
      return {
        experiment: experiment.accession,
        allValues,
        values,
        samples: samples.length,
        activities: values.length,
        min,
        max,
        range
      };
    })
    .filter((experiment) => experiment.activities);
};
