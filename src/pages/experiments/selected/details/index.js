import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';

import Clickable from '../../../../components/clickable';
import ExperimentLink from '../../../experiment/link';
import { mapExperimentResult } from '../../search';

import { ReactComponent as ExperimentIcon } from '../../../../images/experiment.svg';
import { ReactComponent as SampleIcon } from '../../../../images/sample.svg';

import './index.css';

const limit = 300;

// main details of selected experiment

let Details = ({ experiment }) => {
  const [expanded, setExpanded] = useState(false);

  let { samples = [], name = '', description = '' } = experiment;
  samples = `${samples.length || 0} sample${samples.length === 1 ? '' : 's'}`;
  if (!expanded && description.length > limit)
    description = description.substr(0, limit) + '...';

  return (
    <>
      <div className='info weight_medium'>
        <span>
          <ExperimentIcon />
          <ExperimentLink experiment={experiment} />
        </span>
        <span>
          <SampleIcon />
          {samples}
        </span>
      </div>
      <div className='experiment_info'>
        <div className='weight_medium'>{name}</div>
        <div>{description}</div>
        <Clickable
          text={expanded ? 'Show less' : 'Show more'}
          link
          onClick={() => setExpanded(!expanded)}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  experiment: mapExperimentResult(state.experiments.selected, state)
});

Details = connect(mapStateToProps)(Details);

export default Details;
