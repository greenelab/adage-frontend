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
import { getEnrichedSignatures } from './actions/genes';
import { getGeneEdges } from './actions/genes';
import { selectModel } from './actions/models';
import { selectSamples } from './actions/samples';
import { isArray } from './util/types';

const MAX_INT = 9999999;

// dispatch new actions in response to redux state changes
let Controller = ({
  modelList,
  geneList,
  experimentList,
  sampleList,
  signatureList,
  selectedOrganism,
  selectedModel,
  selectedGenes,
  selectedExperiment,
  selectedGenesLoaded,
  selectedExperimentLoaded,
  selectedSamplesLoaded,
  getModelList,
  getGeneList,
  getExperimentList,
  getSampleList,
  getSignatureList,
  getGeneSelectedDetails,
  getExperimentSelectedDetails,
  getSampleSelectedDetails,
  getEnrichedSignatures,
  getGeneEdges,
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
    if (selectedOrganism) {
      getGeneList({
        organism: selectedOrganism,
        limit: MAX_INT
      });
    }
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
    if (selectedModel) {
      getSignatureList({
        model: selectedModel,
        limit: MAX_INT
      });
    }
  }, [selectedModel, getSignatureList]);

  // when full model list loads
  // select model (first in list if not specified)
  useEffect(() => {
    selectModel();
  }, [modelList, selectModel]);

  // when selected experiment changes
  // select samples
  useEffect(() => {
    if (selectedExperiment.samples) {
      selectSamples({
        ids: selectedExperiment.samples.map((sample) => sample.id)
      });
    }
  }, [selectedExperiment, selectSamples]);

  // when full list loads or when new gene selected
  // fill in full details of selected genes
  useEffect(() => {
    if (!selectedGenesLoaded)
      getGeneSelectedDetails();
  }, [
    geneList.length,
    selectedGenes.length,
    selectedGenesLoaded,
    getGeneSelectedDetails
  ]);

  // when full list loads or when new experiment selected
  // fill in full details of selected experiments
  useEffect(() => {
    if (!selectedExperimentLoaded)
      getExperimentSelectedDetails();
  }, [
    experimentList.length,
    selectedExperiment.accession,
    selectedExperimentLoaded,
    getExperimentSelectedDetails
  ]);

  // when full list loads or when new sample selected
  // fill in full details of selected samples
  useEffect(() => {
    if (!selectedSamplesLoaded)
      getSampleSelectedDetails();
  }, [sampleList.length, selectedSamplesLoaded, getSampleSelectedDetails]);

  // when full gene list, selected genes, or full signature list change
  // recompute enriched signatures
  useEffect(() => {
    if (
      isArray(geneList) &&
      geneList.length &&
      isArray(signatureList) &&
      signatureList.length &&
      selectedGenesLoaded
    ) {
      getEnrichedSignatures({
        cancelType: 'GET_ENRICHED_SIGNATURES',
        ids: selectedGenes.map((gene) => gene.id),
        geneList: geneList,
        signatureList: signatureList,
        selectedGenes: selectedGenes,
        limit: selectedGenes.length ? MAX_INT : 1
      });
    }
  }, [
    selectedGenesLoaded,
    selectedGenes,
    geneList,
    signatureList,
    getEnrichedSignatures
  ]);

  // when selected model or selected genes change
  // get gene network edges
  useEffect(() => {
    if (selectedGenesLoaded) {
      getGeneEdges({
        cancelType: 'GET_GENE_EDGES',
        modelId: selectedModel,
        geneIds: selectedGenes.map((selected) => selected.id),
        selectedGenes: selectedGenes,
        limit: selectedGenes.length ? MAX_INT : 1
      });
    }
  }, [selectedModel, selectedGenes, selectedGenesLoaded, getGeneEdges]);

  return <></>;
};

const mapStateToProps = (state) => ({
  modelList: state.model.list,
  geneList: state.gene.list,
  experimentList: state.experiment.list,
  sampleList: state.sample.list,
  signatureList: state.signature.list,
  selectedModel: state.model.selected,
  selectedOrganism: isArray(state.model.list) ?
    (
      state.model.list.find((model) => model.id === state.model.selected) ||
        {}
    ).organism || null :
    null,
  selectedGenes: state.gene.selected,
  selectedExperiment: state.experiment.selected,
  selectedGenesLoaded: state.gene.selected.every((selected) => selected.name),
  selectedExperimentLoaded: state.experiment.selected.name ? true : false,
  selectedSamplesLoaded: state.sample.selected.every(
    (selected) => selected.name
  )
});

const mapDispatchToProps = (dispatch) => {
  const actions = {
    getModelList: getModelList,
    getGeneList: getGeneList,
    getExperimentList: getExperimentList,
    getSampleList: getSampleList,
    getSignatureList: getSignatureList,
    getGeneSelectedDetails: getGeneSelectedDetails,
    getExperimentSelectedDetails: getExperimentSelectedDetails,
    getSampleSelectedDetails: getSampleSelectedDetails,
    getEnrichedSignatures: getEnrichedSignatures,
    getGeneEdges: getGeneEdges,
    selectModel: selectModel,
    selectSamples: selectSamples
  };
  for (const [funcName, func] of Object.entries(actions)) {
    actions[funcName] = (...args) =>
      window.setTimeout(() => dispatch(func(...args)), 100);
  }

  return actions;
};

Controller = connect(mapStateToProps, mapDispatchToProps)(Controller);

export default Controller;
