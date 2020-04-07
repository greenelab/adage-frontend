import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getSignatureList } from '../actions/signatures';
import { getSignatureParticipations } from '../actions/signatures';
import { getSignatureActivities } from '../actions/signatures';
import { MAX_INT } from './';
import { makeMapDispatchToProps } from '../actions';

// dispatch new actions in response to redux state changes
let SignatureController = ({
  selectedModel,
  selectedSignature,
  getSignatureList,
  getSignatureParticipations,
  getSignatureActivities
}) => {
  // when selected model changes
  // get full signature list
  useEffect(() => {
    if (!selectedModel.id)
      return;

    getSignatureList({
      modelId: selectedModel.id,
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
      id: selectedSignature.id,
      limit: MAX_INT
    });
  }, [selectedSignature.id, getSignatureParticipations]);

  // when selected model or signature changes
  // get signature activities
  useEffect(() => {
    // if we dont have all we need, dont even dispatch action
    if (!selectedModel || !selectedSignature.id)
      return;

    getSignatureActivities({
      modelId: selectedModel,
      signatureIds: [selectedSignature.id],
      limit: MAX_INT
    });
  }, [selectedModel, selectedSignature.id, getSignatureActivities]);

  return <></>;
};

const mapStateToProps = (state) => ({
  selectedModel: state.models.selected,
  selectedSignature: state.signatures.selected
});

const mapDispatchToProps = makeMapDispatchToProps({
  getSignatureList,
  getSignatureParticipations,
  getSignatureActivities
});

SignatureController = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignatureController);

export { SignatureController };
