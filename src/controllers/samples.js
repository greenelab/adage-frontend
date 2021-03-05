import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getSampleList } from '../actions/samples';
import { getSampleActivities } from '../actions/samples';
import { setVolcano } from '../actions/samples';
import { selectSamples } from '../actions/samples';
import { isArray } from '../util/types';
import { actionStatuses } from '../actions/fetch';
import { makeMapDispatchToProps } from './util';

// eslint-disable-next-line
import worker from 'workerize-loader!../util/math';

// dispatch new actions in response to redux state changes
let SampleController = ({
  signatureList,
  selectedModel,
  selectedExperiment,
  activities,
  diamondGroup,
  spadeGroup,
  getSampleList,
  getSampleActivities,
  setVolcano,
  selectSamples
}) => {
  // on first render
  // get full sample list
  useEffect(() => {
    getSampleList();
  }, [getSampleList]);

  // when selected experiment changes
  // select samples
  useEffect(() => {
    if (!selectedExperiment.samples)
      return;

    selectSamples({
      ids: selectedExperiment.samples
    });
  }, [selectedExperiment, selectSamples]);

  // when selected model or experiment changes
  // get sample activities
  useEffect(() => {
    // if we don't have all we need, don't even dispatch action
    if (
      !selectedModel.id ||
      !selectedExperiment.samples ||
      !selectedExperiment.samples.length
    )
      return;

    getSampleActivities({
      model: selectedModel.id,
      samples: selectedExperiment.samples
    });
  }, [selectedModel.id, selectedExperiment, getSampleActivities]);

  // when sample groups or activities change
  // recalculate volcano plot data
  useEffect(() => {
    // if we don't have all we need, don't even dispatch action
    if (
      !isArray(signatureList) ||
      !signatureList.length ||
      !isArray(activities) ||
      !activities.length
    )
      return;

    setVolcano(actionStatuses.LOADING);
    const calculate = async () => {
      setVolcano(
        await worker().calculateVolcanoSignatures({
          signatureList,
          activities,
          diamondGroup,
          spadeGroup
        })
      );
    };
    calculate();
  }, [signatureList, activities, diamondGroup, spadeGroup, setVolcano]);

  return <></>;
};

const mapStateToProps = (state) => ({
  signatureList: state.signatures.list,
  selectedModel: state.models.selected,
  selectedExperiment: state.experiments.selected,
  activities: state.samples.activities,
  diamondGroup: state.samples.groups.diamond,
  spadeGroup: state.samples.groups.spade
});

const mapDispatchToProps = makeMapDispatchToProps({
  getSampleList,
  getSampleActivities,
  setVolcano,
  selectSamples
});

SampleController = connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleController);

export { SampleController };
