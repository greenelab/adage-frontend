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
import { selectModel } from './actions/models';
import { getGeneEnrichedSignatures } from './actions/genes';
import { getGeneEdges } from './actions/genes';
import { isArray } from './util/types';

const MAX_INT = 9999999;

// dispatch new actions in response to redux state changes
let Controller = ({
  models,
  genes,
  experiments,
  signatures,
  selectModel,
  selectedOrganism,
  selectedModel,
  selectedGenesLoaded,
  selectedGenes,
  selectedExperimentAccession,
  getModelList,
  getGeneList,
  getExperimentList,
  getSampleList,
  getSignatureList,
  getGeneSelectedDetails,
  getExperimentSelectedDetails,
  getEnrichedSignatures,
  getGeneEdges
}) => {
  // on first render
  // get full model list
  useEffect(() => {
    getModelList();
  }, [getModelList]);

  // on first render
  // get full experiment list
  useEffect(() => {
    getExperimentList({ limit: MAX_INT });
  }, [getExperimentList]);

  // on first render
  // get full sample list
  useEffect(() => {
    getSampleList({ limit: MAX_INT });
  }, [getSampleList]);

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
  }, [models, selectModel]);

  // when full gene list or selected genes change
  // fill in full details of selected genes
  useEffect(() => {
    getGeneSelectedDetails();
  }, [genes.length, selectedGenes.length, getGeneSelectedDetails]);

  // when full experiment list or selected experiments change
  // fill in full details of selected experiments
  useEffect(() => {
    getExperimentSelectedDetails();
  }, [
    experiments.length,
    selectedExperimentAccession,
    getExperimentSelectedDetails
  ]);

  // when full gene list, selected genes, or full signature list change
  // recompute enriched signatures
  useEffect(() => {
    if (
      isArray(genes) &&
      genes.length &&
      isArray(signatures) &&
      signatures.length &&
      selectedGenesLoaded
    ) {
      getEnrichedSignatures({
        cancelType: 'GET_GENE_ENRICHED_SIGNATURES',
        ids: selectedGenes.map((gene) => gene.id),
        genes: genes,
        signatures: signatures,
        selectedGenes: selectedGenes,
        limit: selectedGenes.length ? MAX_INT : 1
      });
    }
  }, [
    selectedGenesLoaded,
    selectedGenes,
    genes,
    signatures,
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
  models: state.model.list,
  genes: state.gene.list,
  experiments: state.experiment.list,
  signatures: state.signature.list,
  selectedModel: state.model.selected,
  selectedOrganism: isArray(state.model.list) ?
    (
      state.model.list.find((model) => model.id === state.model.selected) ||
        {}
    ).organism || null :
    null,
  selectedGenesLoaded: state.gene.selected.every(
    (selected) => selected.name
  ),
  selectedGenes: state.gene.selected,
  selectedExperimentAccession: state.experiment.selected.accession
});

const mapDispatchToProps = (dispatch) => {
  const delayedDispatch = (...args) =>
    window.setTimeout(() => dispatch(...args), 100);

  return {
    getModelList: () => delayedDispatch(getModelList()),
    getGeneList: (...args) => delayedDispatch(getGeneList(...args)),
    getExperimentList: (...args) => delayedDispatch(getExperimentList(...args)),
    getSampleList: (...args) => delayedDispatch(getSampleList(...args)),
    getSignatureList: (...args) => delayedDispatch(getSignatureList(...args)),
    getGeneSelectedDetails: () => delayedDispatch(getGeneSelectedDetails()),
    getExperimentSelectedDetails: () =>
      delayedDispatch(getExperimentSelectedDetails()),
    selectModel: () => delayedDispatch(selectModel()),
    getEnrichedSignatures: (...args) =>
      delayedDispatch(getGeneEnrichedSignatures(...args)),
    getGeneEdges: (...args) => delayedDispatch(getGeneEdges(...args))
  };
};

Controller = connect(mapStateToProps, mapDispatchToProps)(Controller);

export default Controller;
