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

/* eslint import/no-webpack-loader-syntax: off */
import worker from 'workerize-loader!../../../util/math';

import './index.css';

// sample activities section

let Activities = ({ activities }) => {
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

  useEffect(() => {
    setSortedSamples(null);
    setSortedSignatures(null);
  }, [activities]);

  const sortSamples = useCallback(async () => {
    setSortedSamples(actionStatuses.LOADING);
    setSortedSamples(await worker().clusterData(activities, 'sample', 'value'));
  }, [activities]);

  const sortSignatures = useCallback(async () => {
    setSortedSignatures(actionStatuses.LOADING);
    setSortedSignatures(
      await worker().clusterData(activities, 'signature', 'value')
    );
  }, [activities]);

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
          />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  activities: mapActivities(state.sample.activities, state)
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
      (isArray(state.sample.list) ? state.sample.list : []).find(
        (sample) => sample.id === activity.sample
      ) || {}
    ).name || activity.sample,
  signatureName:
    (
      (isArray(state.signature.list) ? state.signature.list : []).find(
        (signature) => signature.id === activity.signature
      ) || {}
    ).name || activity.signature
});
