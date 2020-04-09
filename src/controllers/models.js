import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getModelList } from '../actions/models';
import { selectModel } from '../actions/models';
import { makeMapDispatchToProps } from './util';

let ModelController = ({
  selectedModel,
  modelList,
  getModelList,
  selectModel
}) => {
  // on first render
  // get full model list
  useEffect(() => {
    getModelList();
  }, [getModelList]);

  // when full model list loads
  // select model 1
  useEffect(() => {
    if (!selectedModel?.id)
      selectModel({ id: 1 });
  }, [modelList, selectModel, selectedModel]);

  return <></>;
};

const mapStateToProps = (state) => ({
  selectedModel: state.models.selected,
  modelList: state.models.list
});

const mapDispatchToProps = makeMapDispatchToProps({
  getModelList,
  selectModel
});

ModelController = connect(mapStateToProps, mapDispatchToProps)(ModelController);

export { ModelController };
