import React from 'react';
import { connect } from 'react-redux';

import ExperimentLink from '../../../experiment/link';
import { mapExperimentResult } from '../../search';

import { ReactComponent as ExperimentIcon } from '../../../../images/experiment.svg';
import { ReactComponent as SampleIcon } from '../../../../images/sample.svg';

import './index.css';

const limit = 200;

// main details of selected experiment

let Details = ({ experiment }) => (
  <>
    <div className='info medium'>
      <span>
        <ExperimentIcon />
        <ExperimentLink experiment={experiment} />
      </span>
      <span>
        <SampleIcon />
        {experiment.samples?.length || 0} sample
        {experiment.samples?.length > 1 ? 's' : ''}
      </span>
    </div>
    <div className='medium'>
      {(experiment.name?.substr(0, limit) || '') +
        (experiment.name?.length >= limit ? '...' : '')}
    </div>
    <div>
      {(experiment.description?.substr(0, limit) || '') +
        (experiment.description?.length >= limit ? '...' : '')}
    </div>
  </>
);

const mapStateToProps = (state) => ({
  experiment: mapExperimentResult(state.experiments.selected, state)
});

Details = connect(mapStateToProps)(Details);

export default Details;
