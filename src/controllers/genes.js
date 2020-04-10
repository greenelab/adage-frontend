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
  participations,
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
    if (!selectedOrganism.id)
      return;

    getGeneList({
      organism: selectedOrganism.id,
      limit: MAX_INT
    });
  }, [selectedOrganism.id, getGeneList]);

  // when selected genes change
  // re-get participations
  useEffect(() => {
    // if we dont have all we need, dont even dispatch action
    if (!selectedGenesLoaded)
      return;

    getGeneParticipations({
      cancelType: 'GET_GENE_PARTICIPATIONS',
      genes: selectedGenes.map((gene) => gene.id),
      limit: selectedGenes.length ? MAX_INT : 1
    });
  }, [selectedGenes, selectedGenesLoaded, getGeneParticipations]);

  // when full gene or signature lists load, or selected genes change
  // recompute enriched signatures
  useEffect(() => {
    // if we dont have all we need, dont even dispatch action
    if (
      !selectedGenesLoaded ||
      !isArray(participations) ||
      !participations.length ||
      !isArray(geneList) ||
      !geneList.length ||
      !isArray(signatureList) ||
      !signatureList.length
    )
      return;

    const calculate = async () => {
      setEnrichedSignatures(
        await worker().calculateEnrichedSignatures({
          participations,
          selectedGenes,
          geneList,
          signatureList
        })
      );
    };
    calculate();
  }, [
    participations,
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
      model: selectedModel.id,
      genes: selectedGenes.map((selected) => selected.id),
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
  participations: state.genes.participations,
  selectedModel: state.models.selected,
  selectedOrganism: state.organisms.selected,
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
