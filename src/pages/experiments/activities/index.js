import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { connect } from 'react-redux';

import FetchAlert from '../../../components/fetch-alert';
import Heatmap from './heatmap';
import Controls from './controls';
import { actionStatuses } from '../../../actions/fetch';
import { isString } from '../../../util/types';
import { isArray } from '../../../util/types';
import { uniqueMap } from '../../../util/object';

import worker from 'workerize-loader!../../../util/math';

import './index.css';

// sample activities section

let Activities = ({ selectedExperiment, sampleActivities }) => {
  const [sortedSamples, setSortedSamples] = useState(null);
  const [sortedSignatures, setSortedSignatures] = useState(null);

  let unsortedSamples;
  let unsortedSignatures;
  if (isArray(sampleActivities)) {
    unsortedSamples = uniqueMap(sampleActivities, (activity) => activity.sample);
    unsortedSignatures = uniqueMap(
      sampleActivities,
      (activity) => activity.signature
    );
  }

  // reset sorts
  const reset = useCallback(() => {
    setSortedSamples(null);
    setSortedSignatures(null);
  }, []);

  // sort samples with clustering
  const sortSamples = useCallback(async () => {
    setSortedSamples(actionStatuses.LOADING);
    setSortedSamples(
      await worker().clusterData({
        data: sampleActivities,
        idKey: 'sample',
        valueKey: 'value'
      })
    );
  }, [sampleActivities]);

  // sort signatures with clustering
  const sortSignatures = useCallback(async () => {
    setSortedSignatures(actionStatuses.LOADING);
    setSortedSignatures(
      await worker().clusterData({
        data: sampleActivities,
        idKey: 'signature',
        valueKey: 'value'
      })
    );
  }, [sampleActivities]);

  // when selected experiment changes
  // reset sorts
  useEffect(() => {
    reset();
  }, [reset, selectedExperiment]);

  return (
    <>
      {isString(sampleActivities) && (
        <FetchAlert status={sampleActivities} subject='activities' />
      )}
      {isArray(sampleActivities) && (
        <>
          <Heatmap
            activities={sampleActivities}
            samples={isArray(sortedSamples) ? sortedSamples : unsortedSamples}
            signatures={
              isArray(sortedSignatures) ? sortedSignatures : unsortedSignatures
            }
          />
          <Controls
            activities={sampleActivities}
            sortedSamples={sortedSamples}
            sortedSignatures={sortedSignatures}
            sortSamples={sortSamples}
            sortSignatures={sortSignatures}
            reset={reset}
          />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  selectedExperiment: state.experiments.selected,
  sampleActivities: mapActivities(state.samples.activities, state)
});

Activities = connect(mapStateToProps)(Activities);

export default Activities;

export const mapActivities = (activities, state) =>
  isArray(activities) ?
    activities.map((activity) => mapActivity(activity, state)) :
    activities;

export const mapActivity = (activity, state) => ({
  ...activity,
  sampleName:
    (
      (isArray(state.samples.list) ? state.samples.list : []).find(
        (sample) => sample.id === activity.sample
      ) || {}
    ).name || activity.sample,
  signatureName:
    (
      (isArray(state.signatures.list) ? state.signatures.list : []).find(
        (signature) => signature.id === activity.signature
      ) || {}
    ).name || activity.signature
});
