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

// status vars to only take most recent cluster results
let sortingSamples;
let sortingSignatures;

// sample activities section

let Activities = ({ selectedExperiment, activities }) => {
  const [sortedSamples, setSortedSamples] = useState(null);
  const [sortedSignatures, setSortedSignatures] = useState(null);

  let unsortedSamples;
  let unsortedSignatures;
  if (isArray(activities)) {
    unsortedSamples = uniqueMap(activities, (activity) => activity.sample);
    unsortedSignatures = uniqueMap(
      activities,
      (activity) => activity.signature
    );
  }

  // reset sorts
  const reset = useCallback(() => {
    setSortedSamples(null);
    setSortedSignatures(null);
    sortingSamples = null;
    sortingSignatures = null;
  }, []);

  // sort samples with clustering
  const sortSamples = useCallback(async () => {
    // if already sorting, don't sort again
    if (sortingSamples)
      return;

    // set status to sorting
    setSortedSamples(actionStatuses.LOADING);
    const processId = window.performance.now();
    sortingSamples = processId;

    // cluster
    const newSamples = await worker().clusterData({
      data: activities,
      idKey: 'sample',
      valueKey: 'value'
    });

    // if new sort or sort reset in meantime, exit and disregard results
    if (sortingSamples !== processId)
      return;

    // set new
    setSortedSamples(newSamples);
  }, [activities]);

  // sort signatures with clustering
  const sortSignatures = useCallback(async () => {
    // if already sorting, don't sort again
    if (sortingSignatures)
      return;

    // set status to sorting
    setSortedSignatures(actionStatuses.LOADING);
    const processId = window.performance.now();
    sortingSignatures = processId;

    // cluster
    const newSignatures = await worker().clusterData({
      data: activities,
      idKey: 'signature',
      valueKey: 'value'
    });

    // if new sort or sort reset in meantime, exit and disregard results
    if (sortingSignatures !== processId)
      return;

    // set new
    setSortedSignatures(newSignatures);
  }, [activities]);

  // when selected experiment changes
  // reset sorts
  useEffect(() => {
    reset();
  }, [reset, selectedExperiment]);

  return (
    <>
      {isString(activities) && (
        <FetchAlert status={activities} subject='activities' />
      )}
      {isArray(activities) && (
        <>
          <Heatmap
            activities={activities}
            samples={isArray(sortedSamples) ? sortedSamples : unsortedSamples}
            signatures={
              isArray(sortedSignatures) ? sortedSignatures : unsortedSignatures
            }
          />
          <Controls
            activities={activities}
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
  activities: mapActivities(state.samples.activities, state)
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
