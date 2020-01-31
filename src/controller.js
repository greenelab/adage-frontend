import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getModelList } from './actions/models.js';
import { getGeneList } from './actions/genes.js';
import { getSignatureList } from './actions/signatures.js';
import { getGeneSelectedDetails } from './actions/genes.js';
import { setSelectedModel } from './actions/models.js';
import { getGeneEnrichedSignatures } from './actions/genes.js';
import { getGeneEdges } from './actions/genes.js';
import { isArray } from './util/types.js';

const MAX_INT = 9999999;

// dispatch new actions in response to redux state changes
let Controller = ({
  modelList,
  signatures,
  genes,
  selectedModel,
  selectedOrganism,
  setSelectedModel,
  selectedGenesLoaded,
  selectedGenes,
  getModelList,
  getGeneList,
  getSignatureList,
  getGeneSelectedDetails,
  getEnrichedSignatures,
  getGeneEdges
}) => {
  useEffect(() => {
    getModelList();
  }, [getModelList]);

  useEffect(() => {
    if (selectedOrganism) {
      getGeneList({
        organism: selectedOrganism,
        limit: MAX_INT
      });
    }
  }, [selectedOrganism, getGeneList]);

  useEffect(() => {
    if (selectedModel) {
      getSignatureList({
        model: selectedModel,
        limit: MAX_INT
      });
    }
  }, [selectedModel, getSignatureList]);

  useEffect(() => {
    setSelectedModel();
  }, [modelList, setSelectedModel]);

  useEffect(() => {
    getGeneSelectedDetails();
  }, [genes.length, selectedGenes.length, getGeneSelectedDetails]);

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
  genes: state.gene.list,
  signatures: state.signature.list,
  selectedModel: state.model.selected,
  selectedOrganism: isArray(state.model.list) ?
    (
      state.model.list.find((model) => model.id === state.model.selected) ||
        {}
    ).organism || null :
    null,
  selectedGenesLoaded: state.gene.selected.every(
    (selected) => selected.standard_name
  ),
  selectedGenes: state.gene.selected
});

const mapDispatchToProps = (dispatch) => ({
  getModelList: () => dispatch(getModelList()),
  getGeneList: (...args) => dispatch(getGeneList(...args)),
  getSignatureList: (...args) => dispatch(getSignatureList(...args)),
  getGeneSelectedDetails: () => dispatch(getGeneSelectedDetails()),
  setSelectedModel: () => dispatch(setSelectedModel()),
  getEnrichedSignatures: (...args) =>
    dispatch(getGeneEnrichedSignatures(...args)),
  getGeneEdges: (...args) => dispatch(getGeneEdges(...args))
});

Controller = connect(mapStateToProps, mapDispatchToProps)(Controller);

export default Controller;
