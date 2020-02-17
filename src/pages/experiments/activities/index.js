import React from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { connect } from 'react-redux';

import FetchAlert from '../../../components/fetch-alert';
import Heatmap from './heatmap';
import Controls from './controls';
import { isString } from '../../../util/types';
import { isArray } from '../../../util/types';
import { uniqueMap } from '../../../util/object';

/* eslint import/no-webpack-loader-syntax: off */
import worker from 'workerize-loader!./cluster';

import './index.css';

// sample activities section

const workerInstance = worker();

let Activities = ({ activities }) => {
  const [clusteredSamples, setClusteredSamples] = useState(null);
  const [clusteredSignatures, setClusteredSignatures] = useState(null);

  let samples;
  let signatures;
  if (isArray(activities)) {
    samples = uniqueMap(activities, (activity) => activity.sample);
    signatures = uniqueMap(activities, (activity) => activity.signature);
  }

  const clusterSamples = useCallback(async () => {
    setClusteredSamples(
      await workerInstance.clusterData(activities, 'sample', 'value')
    );
  }, [activities]);

  const clusterSignatures = useCallback(async () => {
    setClusteredSignatures(
      await workerInstance.clusterData(activities, 'signature', 'value')
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
            samples={clusteredSamples || samples}
            signatures={clusteredSignatures || signatures}
          />
          <Controls
            activities={activities}
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
