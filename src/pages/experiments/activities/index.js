import React from 'react';
import { connect } from 'react-redux';

import FetchAlert from '../../../components/fetch-alert';
import Heatmap from './heatmap';
import Controls from './controls';

import { isString } from '../../../util/types';
import { isArray } from '../../../util/types';

import './index.css';

// sample activities section

let Activities = ({ activities }) => (
  <>
    {isString(activities) && (
      <FetchAlert status={activities} subject='activities' />
    )}
    {isArray(activities) && (
      <>
        <Heatmap activities={activities} />
        <Controls activities={activities} />
      </>
    )}
  </>
);

const mapStateToProps = (state) => ({
  activities: mapActivities(state.samples.activities, state)
});

Activities = connect(mapStateToProps)(Activities);

export default Activities;

export const mapActivities = (activities, state) =>
  isArray(activities) ?
    activities.map((activity) => mapActivity(activity, state)) :
    activities;


const sampleMap = new Map();
const signatureMap = new Map();

export const mapActivity = (activity, state) => {
  let { value, sample, signature } = activity;
  const samples = state.samples.list;
  const signatures = state.signatures.list;

  if (!sampleMap.size && isArray(samples))
    for (const sample of samples) sampleMap.set(sample.id, sample);

  if (!signatureMap.size && isArray(signatures))
    for (const signature of signatures)
      signatureMap.set(signature.id, signature);

  if (isArray(samples)) sample = sampleMap[sample] || { id: sample };
  else sample = { id: sample };

  if (isArray(signatures))
    signature = signatureMap[signature] || { id: signature };
  else signature = { id: signature };

  return { ...activity, value, sample, signature };
};
