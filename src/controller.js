import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getModelList } from './actions/models';
import { getGeneList } from './actions/genes';
import { getExperimentList } from './actions/experiments';
import { getSampleList } from './actions/samples';
import { getSignatureList } from './actions/signatures';
import { getGeneSelectedDetails } from './actions/genes';
import { getExperimentSelectedDetails } from './actions/experiments';
import { getSampleSelectedDetails } from './actions/samples';
import { getSignatureSelectedDetails } from './actions/signatures';
import { getParticipations } from './actions/genes';
import { setEnrichedSignatures } from './actions/genes';
import { getGeneEdges } from './actions/genes';
import { getActivities } from './actions/samples';
import { setVolcano } from './actions/samples';
import { selectModel } from './actions/models';
import { selectSamples } from './actions/samples';
import { isArray } from './util/types';
import { actionStatuses } from './actions/fetch';

/* eslint import/no-webpack-loader-syntax: off */
import worker from 'workerize-loader!./util/math';

const MAX_INT = 9999999;

// dispatch new actions in response to redux state changes
let Controller = ({
  modelList,
  geneList,
  experimentList,
  sampleList,
  signatureList,
  participations,
  selectedOrganism,
  selectedModel,
  selectedGenes,
  selectedExperiment,
  selectedSignature,
  selectedGenesLoaded,
  selectedExperimentLoaded,
  selectedSamplesLoaded,
  selectedSignatureLoaded,
  activities,
  diamondGroup,
  spadeGroup,
  getModelList,
  getGeneList,
  getExperimentList,
  getSampleList,
  getSignatureList,
  getGeneSelectedDetails,
  getExperimentSelectedDetails,
  getSampleSelectedDetails,
  getSignatureSelectedDetails,
  getParticipations,
  setEnrichedSignatures,
  getGeneEdges,
  getActivities,
  setVolcano,
  selectModel,
  selectSamples
}) => {
  // on first render
  // get full model list
  useEffect(() => {
    getModelList();
  }, [getModelList]);

  // on first render
  // when selected model (and thus selected organism) changes
  // get full gene list
  useEffect(() => {
    if (!selectedOrganism)
      return;

    getGeneList({
      organism: selectedOrganism,
      limit: MAX_INT
    });
  }, [selectedOrganism, getGeneList]);

  // get full experiment list
  useEffect(() => {
    getExperimentList({ limit: MAX_INT });
  }, [getExperimentList]);

  // on first render
  // get full sample list
  useEffect(() => {
    getSampleList({ limit: MAX_INT });
  }, [getSampleList]);

  // when selected model changes
  // get full signature list
  useEffect(() => {
    if (!selectedModel)
      return;

    getSignatureList({
      model: selectedModel,
      limit: MAX_INT
    });
  }, [selectedModel, getSignatureList]);

  // when full model list loads
  // select model (first in list if not specified)
  useEffect(() => {
    selectModel();
  }, [modelList, selectModel]);

  // when selected experiment changes
  // select samples
  useEffect(() => {
    if (!selectedExperiment.samples)
      return;

    selectSamples({
      ids: selectedExperiment.samples.map((sample) => sample.id)
    });
  }, [selectedExperiment, selectSamples]);

  // when full gene list loads or when new gene selected
  // fill in full details of selected genes
  useEffect(() => {
    // if details already filled in, exit
    if (selectedGenesLoaded)
      return;

    getGeneSelectedDetails();
  }, [
    geneList.length,
    selectedGenes.length,
    selectedGenesLoaded,
    getGeneSelectedDetails
  ]);

  // when full experiment list loads or when new experiment selected
  // fill in full details of selected experiment
  useEffect(() => {
    // if details already filled in, exit
    if (selectedExperimentLoaded)
      return;

    getExperimentSelectedDetails();
  }, [
    experimentList.length,
    selectedExperiment.accession,
    selectedExperimentLoaded,
    getExperimentSelectedDetails
  ]);

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

  // when full gene list, selected genes, or full signature list change
  // recompute enriched signatures
  useEffect(() => {
    // if we dont have all we need, dont even dispatch action
    if (!selectedGenes.length || !selectedGenesLoaded)
      return;

    getParticipations({
      cancelType: 'GET_PARTICIPATIONS',
      ids: selectedGenes.map((gene) => gene.id),
      limit: selectedGenes.length ? MAX_INT : 1
    });
  }, [
    selectedGenesLoaded,
    selectedGenes,
    geneList,
    signatureList,
    getParticipations
  ]);

  useEffect(() => {
    if (
      !isArray(participations) ||
      !participations.length ||
      !isArray(geneList) ||
      !geneList.length ||
      !isArray(signatureList) ||
      !signatureList.length
    )
      return;

    const calculateEnrichedSignatures = async () => {
      setEnrichedSignatures(
        await worker().calculateEnrichedSignatures({
          participations,
          selectedGenes,
          geneList,
          signatureList
        })
      );
    };
    calculateEnrichedSignatures();
  }, [
    participations,
    selectedGenes,
    geneList,
    signatureList,
    setEnrichedSignatures
  ]);

  // when selected model or selected genes change
  // get gene network edges
  useEffect(() => {
    // if we dont have all we need, dont even dispatch action
    if (!selectedModel || !selectedGenes.length || !selectedGenesLoaded)
      return;

    getGeneEdges({
      cancelType: 'GET_GENE_EDGES',
      modelId: selectedModel,
      geneIds: selectedGenes.map((selected) => selected.id),
      selectedGenes: selectedGenes,
      limit: selectedGenes.length ? MAX_INT : 1
    });
  }, [selectedModel, selectedGenes, selectedGenesLoaded, getGeneEdges]);

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
  modelList: state.model.list,
  geneList: state.gene.list,
  experimentList: state.experiment.list,
  sampleList: state.sample.list,
  signatureList: state.signature.list,
  participations: state.gene.participations,
  selectedModel: state.model.selected,
  selectedOrganism: isArray(state.model.list) ?
    (state.model.list.find((model) => model.id === state.model.selected) || {})
      .organism || null :
    null,
  selectedGenes: state.gene.selected,
  selectedExperiment: state.experiment.selected,
  selectedSignature: state.signature.selected,
  selectedGenesLoaded: state.gene.selected.every((selected) => selected.name),
  selectedExperimentLoaded: state.experiment.selected.name ? true : false,
  selectedSamplesLoaded: state.sample.selected.every((selected) => selected.name),
  selectedSignatureLoaded: state.signature.selected.name ? true : false,
  activities: state.sample.activities,
  diamondGroup: state.sample.groups.diamond,
  spadeGroup: state.sample.groups.spade
});

const mapDispatchToProps = (dispatch) => {
  const actions = {
    getModelList,
    getGeneList,
    getExperimentList,
    getSampleList,
    getSignatureList,
    getGeneSelectedDetails,
    getExperimentSelectedDetails,
    getSampleSelectedDetails,
    getSignatureSelectedDetails,
    getParticipations,
    setEnrichedSignatures,
    getGeneEdges,
    getActivities,
    setVolcano,
    selectModel,
    selectSamples
  };
  for (const [funcName, func] of Object.entries(actions)) {
    actions[funcName] = (...args) =>
      window.setTimeout(() => dispatch(func(...args)), 100);
  }

  return actions;
};

Controller = connect(mapStateToProps, mapDispatchToProps)(Controller);

export default Controller;
