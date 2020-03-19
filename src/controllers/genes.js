import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getGeneList } from '../actions/genes';
import { getGeneSelectedDetails } from '../actions/genes';
import { getGeneParticipations } from '../actions/genes';
import { setEnrichedSignatures } from '../actions/genes';
import { getGeneEdges } from '../actions/genes';
import { isArray } from '../util/types';
import { MAX_INT } from './';
import { makeMapDispatchToProps } from './util';

/* eslint import/no-webpack-loader-syntax: off */
import worker from 'workerize-loader!../util/math';

let GeneController = ({
  geneList,
  signatureList,
  geneParticipations,
  selectedOrganism,
  selectedModel,
  selectedGenes,
  selectedGenesLoaded,
  getGeneList,
  getGeneSelectedDetails,
  getGeneParticipations,
  setEnrichedSignatures,
  getGeneEdges
}) => {
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

  // when selected genes change
  // re-get participations
  useEffect(() => {
    getGeneParticipations({
      cancelType: 'GET_GENE_PARTICIPATIONS',
      ids: selectedGenes.map((gene) => gene.id),
      limit: selectedGenes.length ? MAX_INT : 1
    });
  }, [selectedGenes, getGeneParticipations]);

  // when full gene or signature lists load, or selected genes change
  // recompute enriched signatures
  useEffect(() => {
    // if we dont have all we need, dont even dispatch action
    if (
      !isArray(geneParticipations) ||
      !geneParticipations.length ||
      !isArray(geneList) ||
      !geneList.length ||
      !isArray(signatureList) ||
      !signatureList.length
    )
      return;

    const calculateEnrichedSignatures = async () => {
      setEnrichedSignatures(
        await worker().calculateEnrichedSignatures({
          geneParticipations,
          selectedGenes,
          geneList,
          signatureList
        })
      );
    };
    calculateEnrichedSignatures();
  }, [
    geneParticipations,
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

  return <></>;
};

const mapStateToProps = (state) => ({
  geneList: state.genes.list,
  signatureList: state.signatures.list,
  geneParticipations: state.genes.participations,
  selectedModel: state.models.selected,
  selectedOrganism: isArray(state.models.list) ?
    (
      state.models.list.find((model) => model.id === state.models.selected) ||
        {}
    ).organism || null :
    null,
  selectedGenes: state.genes.selected,
  selectedGenesLoaded: state.genes.selected.every((selected) => selected.name)
});

const mapDispatchToProps = makeMapDispatchToProps({
  getGeneList,
  getGeneSelectedDetails,
  getGeneParticipations,
  setEnrichedSignatures,
  getGeneEdges
});

GeneController = connect(mapStateToProps, mapDispatchToProps)(GeneController);

export { GeneController };
