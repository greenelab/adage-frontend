import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getSignatureList } from '../actions/signatures';
import { getSignatureParticipations } from '../actions/signatures';
import { getSignatureActivities } from '../actions/signatures';
import { getEnrichedGenes } from '../actions/signatures';
import { MAX_INT } from './';
import { makeMapDispatchToProps } from './util';

// dispatch new actions in response to redux state changes
let SignatureController = ({
  selectedModel,
  selectedOrganism,
  selectedSignature,
  getSignatureList,
  getSignatureParticipations,
  getSignatureActivities,
  getEnrichedGenes
}) => {
  // when selected model changes
  // get full signature list
  useEffect(() => {
    if (!selectedModel.id)
      return;

    getSignatureList({
      model: selectedModel.id,
      limit: MAX_INT
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
      signature: selectedSignature.id,
      limit: MAX_INT
    });
  }, [selectedSignature.id, getSignatureParticipations]);

  // when selected model or signature changes
  // get signature activities
  useEffect(() => {
    // if we dont have all we need, dont even dispatch action
    if (!selectedModel.id || !selectedSignature.id)
      return;

    getSignatureActivities({
      model: selectedModel.id,
      signatures: [selectedSignature.id],
      limit: MAX_INT
    });
  }, [selectedModel.id, selectedSignature.id, getSignatureActivities]);

  // when selected organism changes
  // get pickled genes
  useEffect(() => {
    // if we dont have all we need, dont even dispatch action
    if (!selectedOrganism.scientificName)
      return;

    getEnrichedGenes({
      organism: selectedOrganism.scientificName
    });
  }, [selectedOrganism.scientificName, getEnrichedGenes]);

  return <></>;
};

const mapStateToProps = (state) => ({
  selectedModel: state.models.selected,
  selectedOrganism: state.organisms.selected,
  selectedSignature: state.signatures.selected
});

const mapDispatchToProps = makeMapDispatchToProps({
  getSignatureList,
  getSignatureParticipations,
  getSignatureActivities,
  getEnrichedGenes
});

SignatureController = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignatureController);

export { SignatureController };
