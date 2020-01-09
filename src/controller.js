import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getModelList } from './actions/models.js';
import { setSelectedModel } from './actions/models.js';
import { getGeneCount } from './actions/genes.js';
import { getSignatureList } from './actions/signatures.js';
import { isArray } from './util/types.js';

// dispatches new actions in response to state changes
// only for pieces of state needed globally across app
let Controller = ({
  modelList,
  selectedModel,
  selectedOrganism,
  getModelList,
  setSelectedModel,
  getGeneCount,
  getSignatureList
}) => {
  useEffect(() => {
    getModelList();
  }, [getModelList]);

  useEffect(() => {
    setSelectedModel();
  }, [modelList, setSelectedModel]);

  useEffect(() => {
    if (selectedOrganism)
      getGeneCount({ organism: selectedOrganism, limit: 1, count: true });
  }, [selectedOrganism, getGeneCount]);

  useEffect(() => {
    if (selectedModel)
      getSignatureList({ model: selectedModel, limit: 999999 });
  }, [selectedModel, getSignatureList]);

  return <></>;
};

const mapStateToProps = (state) => ({
  modelList: state.model.list,
  selectedModel: state.model.selected,
  selectedOrganism: isArray(state.model.list) ?
    (
      state.model.list.find((model) => model.id === state.model.selected) ||
        {}
    ).organism || null :
    null
});

const mapDispatchToProps = (dispatch) => ({
  getModelList: () => dispatch(getModelList()),
  setSelectedModel: () => dispatch(setSelectedModel()),
  getGeneCount: (...args) => dispatch(getGeneCount(...args)),
  getSignatureList: (...args) => dispatch(getSignatureList(...args))
});

Controller = connect(mapStateToProps, mapDispatchToProps)(Controller);

export default Controller;
