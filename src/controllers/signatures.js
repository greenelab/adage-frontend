import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getSignatureList } from '../actions/signatures';
import { getSignatureParticipations } from '../actions/signatures';
import { getSignatureActivities } from '../actions/signatures';
import { getPickledGenes } from '../actions/signatures';
import { setEnrichedGenes } from '../actions/signatures';
import { isArray } from '../util/types';
import { isObject } from '../util/types';
import { actionStatuses } from '../actions/fetch';
import { makeMapDispatchToProps } from './util';

// eslint-disable-next-line
import worker from 'workerize-loader!../util/math';

// dispatch new actions in response to redux state changes
let SignatureController = ({
  geneList,
  selectedModel,
  selectedOrganism,
  selectedSignature,
  signatureParticipations,
  pickledGenes,
  getSignatureList,
  getSignatureParticipations,
  getSignatureActivities,
  getPickledGenes,
  setEnrichedGenes
}) => {
  // when selected model changes
  // get full signature list
  useEffect(() => {
    if (!selectedModel.id)
      return;

    getSignatureList({
      model: selectedModel.id
    });
  }, [selectedModel.id, getSignatureList]);

  // when selected signature changes
  // re-get participations
  useEffect(() => {
    // if we don't have all we need, exit
    if (!selectedSignature.id)
      return;

    getSignatureParticipations({
      cancelType: 'GET_SIGNATURE_PARTICIPATIONS',
      signature: selectedSignature.id
    });
  }, [selectedSignature.id, getSignatureParticipations]);

  // when selected model or signature changes
  // get signature activities
  useEffect(() => {
    // if we don't have all we need, don't even dispatch action
    if (!selectedModel.id || !selectedSignature.id)
      return;

    getSignatureActivities({
      model: selectedModel.id,
      signatures: [selectedSignature.id]
    });
  }, [selectedModel.id, selectedSignature.id, getSignatureActivities]);

  // when selected organism changes
  // get pickled genes
  useEffect(() => {
    // if we don't have all we need, don't even dispatch action
    if (!selectedOrganism.scientificName)
      return;

    getPickledGenes({
      organism: selectedOrganism.scientificName
    });
  }, [selectedOrganism.scientificName, getPickledGenes]);

  // when full gene or signature lists load, or selected genes change
  // recompute enriched gene sets
  useEffect(() => {
    // if we don't have all we need, don't even dispatch action
    if (
      !isArray(geneList) ||
      !geneList.length ||
      !isArray(signatureParticipations) ||
      !signatureParticipations.length ||
      !isObject(pickledGenes)
    )
      return;

    setEnrichedGenes(actionStatuses.LOADING);
    const calculate = async () => {
      setEnrichedGenes(
        await worker().calculateEnrichedGenes({
          geneList,
          signatureParticipations,
          pickledGenes
        })
      );
    };
    calculate();
  }, [geneList, signatureParticipations, pickledGenes, setEnrichedGenes]);

  return <></>;
};

const mapStateToProps = (state) => ({
  geneList: state.genes.list,
  selectedModel: state.models.selected,
  selectedOrganism: state.organisms.selected,
  selectedSignature: state.signatures.selected,
  signatureParticipations: state.signatures.participations,
  pickledGenes: state.signatures.pickledGenes
});

const mapDispatchToProps = makeMapDispatchToProps({
  getSignatureList,
  getSignatureParticipations,
  getSignatureActivities,
  getPickledGenes,
  setEnrichedGenes
});

SignatureController = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignatureController);

export { SignatureController };
