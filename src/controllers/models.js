import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getModelList } from '../actions/models';
import { selectModel } from '../actions/models';
import { makeMapDispatchToProps } from '../actions';

let ModelController = ({ modelList, getModelList, selectModel }) => {
  // on first render
  // get full model list
  useEffect(() => {
    getModelList();
  }, [getModelList]);

  // when full model list loads
  // select model (first in list if not specified)
  useEffect(() => {
    selectModel();
  }, [modelList, selectModel]);

  return <></>;
};

const mapStateToProps = (state) => ({
  modelList: state.models.list
});

const mapDispatchToProps = makeMapDispatchToProps({
  getModelList,
  selectModel
});

ModelController = connect(mapStateToProps, mapDispatchToProps)(ModelController);

export { ModelController };
