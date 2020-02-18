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
import worker from 'workerize-loader!./cluster';

import './index.css';

// sample activities section

let Activities = ({ activities }) => {
  const [clusteredSamples, setClusteredSamples] = useState(null);
  const [clusteredSignatures, setClusteredSignatures] = useState(null);

  let samples;
  let signatures;
  if (isArray(activities)) {
    samples = uniqueMap(activities, (activity) => activity.sample);
    signatures = uniqueMap(activities, (activity) => activity.signature);
  }

  useEffect(() => {
    setClusteredSamples(null);
    setClusteredSignatures(null);
  }, [activities]);

  const clusterSamples = useCallback(async () => {
    setClusteredSamples(actionStatuses.LOADING);
    setClusteredSamples(
      await worker().clusterData(activities, 'sample', 'value')
    );
  }, [activities]);

  const clusterSignatures = useCallback(async () => {
    setClusteredSignatures(actionStatuses.LOADING);
    setClusteredSignatures(
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
            samples={isArray(clusteredSamples) ? clusteredSamples : samples}
            signatures={
              isArray(clusteredSignatures) ? clusteredSignatures : signatures
            }
          />
          <Controls
            activities={activities}
            clusteredSamples={clusteredSamples}
            clusteredSignatures={clusteredSignatures}
            clusterSamples={clusterSamples}
            clusterSignatures={clusterSignatures}
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
