import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getGeneList } from '../actions/genes';
import { getGeneParticipations } from '../actions/genes';
import { setEnrichedSignatures } from '../actions/genes';
import { getGeneEdges } from '../actions/genes';
import { isArray } from '../util/types';
import { MAX_INT } from './';
import { makeMapDispatchToProps } from './util';

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

  // when selected genes change
  // re-get participations
  useEffect(() => {
    // if we dont have all we need, dont even dispatch action
    if (!selectedGenesLoaded)
      return;

    getGeneParticipations({
      cancelType: 'GET_GENE_PARTICIPATIONS',
      ids: selectedGenes.map((gene) => gene.id),
      limit: selectedGenes.length ? MAX_INT : 1
    });
  }, [selectedGenes, selectedGenesLoaded, getGeneParticipations]);

  // when full gene or signature lists load, or selected genes change
  // recompute enriched signatures
  useEffect(() => {
    // if we dont have all we need, dont even dispatch action
    if (
      !selectedGenesLoaded ||
      !isArray(geneParticipations) ||
      !geneParticipations.length ||
      !isArray(geneList) ||
      !geneList.length ||
      !isArray(signatureList) ||
      !signatureList.length
    )
      return;

    const calculate = async () => {
      setEnrichedSignatures(
        await worker().calculateEnrichedSignatures({
          geneParticipations,
          selectedGenes,
          geneList,
          signatureList
        })
      );
    };
    calculate();
  }, [
    geneParticipations,
    selectedGenes,
    selectedGenesLoaded,
    geneList,
    signatureList,
    setEnrichedSignatures
  ]);

  // when selected model or selected genes change
  // get gene network edges
  useEffect(() => {
    // if we dont have all we need, dont even dispatch action
    if (!selectedModel.id || !selectedGenesLoaded)
      return;

    getGeneEdges({
      cancelType: 'GET_GENE_EDGES',
      modelId: selectedModel.id,
      geneIds: selectedGenes.map((selected) => selected.id),
      selectedGenes: selectedGenes,
      // if no genes selected, still make query but with 1 result
      // to reset state.genes.edges and show "empty" alert in network section
      limit: selectedGenes.length ? MAX_INT : 1
    });
  }, [selectedModel.id, selectedGenes, selectedGenesLoaded, getGeneEdges]);

  return <></>;
};

const mapStateToProps = (state) => ({
  geneList: state.genes.list,
  signatureList: state.signatures.list,
  geneParticipations: state.genes.participations,
  selectedModel: state.models.selected,
  selectedOrganism: isArray(state.models.list) ?
    (
      state.models.list.find(
        (model) => model.id === state.models.selected.id
      ) || {}
    ).organism || null :
    null,
  selectedGenes: state.genes.selected,
  selectedGenesLoaded: state.genes.selected.every((selected) => selected.name)
});

const mapDispatchToProps = makeMapDispatchToProps({
  getGeneList,
  getGeneParticipations,
  setEnrichedSignatures,
  getGeneEdges
});

GeneController = connect(mapStateToProps, mapDispatchToProps)(GeneController);

export { GeneController };
