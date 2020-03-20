import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getExperimentList } from '../actions/experiments';
import { getExperimentSelectedDetails } from '../actions/experiments';
import { MAX_INT } from './';
import { makeMapDispatchToProps } from './util';

// dispatch new actions in response to redux state changes
let ExperimentController = ({
  experimentList,
  selectedExperiment,
  selectedExperimentLoaded,
  getExperimentList,
  getExperimentSelectedDetails
}) => {
  // get full experiment list
  useEffect(() => {
    getExperimentList({ limit: MAX_INT });
  }, [getExperimentList]);

  // when full experiment list loads or when new experiment selected
  // fill in full details of selected experiment
  useEffect(() => {
    // if details already filled in, exit
    if (selectedExperimentLoaded)
      return;

    getExperimentSelectedDetails();
  }, [
    experimentList.length,
    selectedExperiment.accession,
    selectedExperimentLoaded,
    getExperimentSelectedDetails
  ]);

  return <></>;
};

const mapStateToProps = (state) => ({
  experimentList: state.experiments.list,
  selectedExperiment: state.experiments.selected,
  selectedExperimentLoaded: state.experiments.selected.name ? true : false
});

const mapDispatchToProps = makeMapDispatchToProps({
  getExperimentList,
  getExperimentSelectedDetails
});

ExperimentController = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentController);

export { ExperimentController };
