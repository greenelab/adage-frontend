import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getModelList } from '../actions/models';
import { selectModel } from '../actions/models';
import { makeMapDispatchToProps } from '../actions';

let ModelController = ({
  modelList,
  selectedModel,
  getModelList,
  selectModel
}) => {
  // on first render
  // get full model list
  useEffect(() => {
    getModelList();
  }, [getModelList]);

  // when full model list loads
  // select model id = 1 if none selected
  useEffect(() => {
    if (!selectedModel.id)
      selectModel({ id: 1 });
  }, [modelList, selectedModel.id, selectModel]);

  return <></>;
};

const mapStateToProps = (state) => ({
  modelList: state.models.list,
  selectedModel: state.models.selected
});

const mapDispatchToProps = makeMapDispatchToProps({
  getModelList,
  selectModel
});

ModelController = connect(mapStateToProps, mapDispatchToProps)(ModelController);

export { ModelController };
