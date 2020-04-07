import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getExperimentList } from '../actions/experiments';
import { MAX_INT } from './';
import { makeMapDispatchToProps } from '../actions';

// dispatch new actions in response to redux state changes
let ExperimentController = ({ getExperimentList }) => {
  // get full experiment list
  useEffect(() => {
    getExperimentList({ limit: MAX_INT });
  }, [getExperimentList]);

  return <></>;
};

const mapDispatchToProps = makeMapDispatchToProps({
  getExperimentList
});

ExperimentController = connect(null, mapDispatchToProps)(ExperimentController);

export { ExperimentController };
