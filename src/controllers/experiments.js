import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getExperimentList } from '../actions/experiments';
import { makeMapDispatchToProps } from './util';

// dispatch new actions in response to redux state changes
let ExperimentController = ({ getExperimentList }) => {
  // get full experiment list
  useEffect(() => {
    getExperimentList();
  }, [getExperimentList]);

  return <></>;
};

const mapDispatchToProps = makeMapDispatchToProps({
  getExperimentList
});

ExperimentController = connect(null, mapDispatchToProps)(ExperimentController);

export { ExperimentController };
