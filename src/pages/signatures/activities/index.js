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
    return { activities };

  // get all activity values
  let allValues = activities.map((activity) => activity.value);
  // get min/max of values
  const allMin = Math.min(...allValues);
  const allMax = Math.max(...allValues);
  // normalize values between 0 and 1
  allValues = allValues.map((value) => (value - allMin) / (allMax - allMin));

  // for each experiment
  return {
    activities: state.experiments.list
      .map((experiment) => {
        // get experiment sample ids
        const samples = experiment.samples.map((sample) => sample.id);
        // get activity value of each sample
        let values = activities
          .filter((activity) => samples.includes(activity.sample))
          .map((activity) => activity.value);
        // get min/max/range of values
        const min = Math.min(...values);
        const max = Math.max(...values);
        const range = max - min;
        // normalize values between 0 and 1, compared to all activities
        values = values.map((value) => (value - allMin) / (allMax - allMin));
        return {
          experiment: experiment.accession,
          values,
          samples: samples.length,
          activities: values.length,
          min,
          max,
          range
        };
      })
      .filter((experiment) => experiment.activities),
    values: allValues
  };
};
