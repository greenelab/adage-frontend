import React from 'react';
import { connect } from 'react-redux';

import ExperimentLink from '../../../experiment/link';
import { mapExperimentResult } from '../../search';

import { ReactComponent as ExperimentIcon } from '../../../../images/experiment.svg';
import { ReactComponent as SampleIcon } from '../../../../images/sample.svg';

import './index.css';

const limit = 200;

// main details of selected experiment

let Details = ({ selectedExperiment }) => (
  <>
    <div className='info medium'>
      <span>
        <ExperimentIcon />
        <ExperimentLink experiment={selectedExperiment} />
      </span>
      <span>
        <SampleIcon />
        {selectedExperiment.samples?.length || 0} sample(s)
      </span>
    </div>
    <div className='medium'>
      {(selectedExperiment.name?.substr(0, limit) || '') +
        (selectedExperiment.name?.length >= limit ? '...' : '')}
    </div>
    <div>
      {(selectedExperiment.description?.substr(0, limit) || '') +
        (selectedExperiment.description?.length >= limit ? '...' : '')}
    </div>
  </>
);

const mapStateToProps = (state) => ({
  selectedExperiment: mapExperimentResult(state.experiments.selected, state)
});

Details = connect(mapStateToProps)(Details);

export default Details;
