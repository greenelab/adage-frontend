import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getModelList } from './actions/models.js';
import { setSelectedModel } from './actions/models.js';
import { getSignatureList } from './actions/signatures.js';

// dispatches new actions in response to state changes
// only for pieces of state needed globally across app
let Controller = ({
  modelList,
  selectedModel,
  getModelList,
  setSelectedModel,
  getSignatureList
}) => {
  useEffect(() => {
    getModelList();
  }, [getModelList]);

  useEffect(() => {
    setSelectedModel();
  }, [modelList, setSelectedModel]);

  useEffect(() => {
    getSignatureList({ model: selectedModel, limit: 999999 });
  }, [selectedModel, getSignatureList]);

  return <></>;
};

const mapStateToProps = (state) => ({
  modelList: state.model.list,
  selectedModel: state.model.selected
});

const mapDispatchToProps = (dispatch) => ({
  getModelList: () => dispatch(getModelList()),
  setSelectedModel: () => dispatch(setSelectedModel()),
  getSignatureList: (...args) => dispatch(getSignatureList(...args))
});

Controller = connect(mapStateToProps, mapDispatchToProps)(Controller);

export default Controller;
