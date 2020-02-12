import React from 'react';
import { connect } from 'react-redux';

import ExperimentLink from '../../../experiment/link';
import { mapExperiment } from '../../';

import './index.css';

import { ReactComponent as ExperimentIcon } from '../../../../images/experiment.svg';
import { ReactComponent as SampleIcon } from '../../../../images/sample.svg';

const limit = 200;

// main details of selected experiment

let Details = ({ experiment }) => (
  <>
    <div className='selected_experiment_info'>
      <div className='medium'>
        {(experiment.name?.substr(0, limit) || '') +
          (experiment.name?.length >= limit ? '...' : '')}
      </div>
      <div>
        {(experiment.description?.substr(0, limit) || '') +
          (experiment.description?.length >= limit ? '...' : '')}
      </div>
    </div>
    <div className='sample_table_info medium'>
      <span>
        <ExperimentIcon />
        <ExperimentLink experiment={experiment} />
      </span>
      <span
        aria-label={'Showing ' + (experiment.samples?.length || 0) + ' samples'}
      >
        <SampleIcon />
        {experiment.samples?.length || 0}
      </span>
    </div>
  </>
);

const mapStateToProps = (state) => ({
  experiment: mapExperiment(state.experiment.selected)
});

Details = connect(mapStateToProps)(Details);

export default Details;
