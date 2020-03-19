import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getSampleList } from '../actions/samples';
import { getSampleSelectedDetails } from '../actions/samples';
import { getSignatureSelectedDetails } from '../actions/signatures';
import { getActivities } from '../actions/samples';
import { setVolcano } from '../actions/samples';
import { selectSamples } from '../actions/samples';
import { isArray } from '../util/types';
import { actionStatuses } from '../actions/fetch';
import { MAX_INT } from './';
import { makeMapDispatchToProps } from './util';

/* eslint import/no-webpack-loader-syntax: off */
import worker from 'workerize-loader!../util/math';

// dispatch new actions in response to redux state changes
let SampleController = ({
  sampleList,
  signatureList,
  selectedModel,
  selectedExperiment,
  selectedSignature,
  selectedSamplesLoaded,
  selectedSignatureLoaded,
  activities,
  diamondGroup,
  spadeGroup,
  getSampleList,
  getSampleSelectedDetails,
  getSignatureSelectedDetails,
  getActivities,
  setVolcano,
  selectSamples
}) => {
  // on first render
  // get full sample list
  useEffect(() => {
    getSampleList({ limit: MAX_INT });
  }, [getSampleList]);

  // when selected experiment changes
  // select samples
  useEffect(() => {
    if (!selectedExperiment.samples)
      return;

    selectSamples({
      ids: selectedExperiment.samples.map((sample) => sample.id)
    });
  }, [selectedExperiment, selectSamples]);

  // when full sample list loads or when new sample selected
  // fill in full details of selected samples
  useEffect(() => {
    // if details already filled in, exit
    if (selectedSamplesLoaded)
      return;

    getSampleSelectedDetails();
  }, [sampleList.length, selectedSamplesLoaded, getSampleSelectedDetails]);

  // when full signature list loads or when new signature selected
  // fill in full details of selected signature
  useEffect(() => {
    // if details already filled in, exit
    if (selectedSignatureLoaded)
      return;

    getSignatureSelectedDetails();
  }, [
    signatureList.length,
    selectedSignature.id,
    selectedSignatureLoaded,
    getSignatureSelectedDetails
  ]);

  // when selected model or experiment changes
  // get sample activities
  useEffect(() => {
    // if we dont have all we need, dont even dispatch action
    if (
      !selectedModel ||
      !selectedExperiment.samples ||
      !selectedExperiment.samples.length
    )
      return;

    getActivities({
      modelId: selectedModel,
      sampleIds: selectedExperiment.samples.map((sample) => sample.id),
      limit: MAX_INT
    });
  }, [selectedModel, selectedExperiment, getActivities]);

  // when sample groups or activities change
  // recalculate volcano plot data
  useEffect(() => {
    // if we dont have all we need, dont even dispatch action
    if (
      !isArray(signatureList) ||
      !signatureList.length ||
      !isArray(activities) ||
      !activities.length
    )
      return;

    setVolcano(actionStatuses.LOADING);
    const calculateVolcanoSignatures = async () => {
      setVolcano(
        await worker().calculateVolcanoSignatures({
          signatureList,
          activities,
          diamondGroup,
          spadeGroup
        })
      );
    };
    calculateVolcanoSignatures();
  }, [signatureList, activities, diamondGroup, spadeGroup, setVolcano]);

  return <></>;
};

const mapStateToProps = (state) => ({
  sampleList: state.samples.list,
  signatureList: state.signatures.list,
  selectedModel: state.models.selected,
  selectedExperiment: state.experiments.selected,
  selectedSignature: state.signatures.selected,
  selectedSamplesLoaded: state.samples.selected.every(
    (selected) => selected.name
  ),
  selectedSignatureLoaded: state.signatures.selected.name ? true : false,
  activities: state.samples.activities,
  diamondGroup: state.samples.groups.diamond,
  spadeGroup: state.samples.groups.spade
});

const mapDispatchToProps = makeMapDispatchToProps({
  getSampleList,
  getSampleSelectedDetails,
  getSignatureSelectedDetails,
  getActivities,
  setVolcano,
  selectSamples
});

SampleController = connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleController);

export { SampleController };
