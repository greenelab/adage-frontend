import React from 'react';
import { connect } from 'react-redux';

import Link from '../../../../components/link';
import { mapExperiment } from '../../';

import './index.css';

const limit = 200;

let Details = ({ experiment }) => (
  <div className='experiment_selected_details'>
    <div className='medium'>
      {(experiment.name?.substr(0, limit) || '') +
        (experiment.name?.length >= limit ? '...' : '')}
    </div>
    <div>
      {(experiment.description?.substr(0, limit) || '') +
        (experiment.description?.length >= limit ? '...' : '')}
    </div>
    <Link
      className='medium'
      to={'/experiment/' + experiment.accession}
      newTab
      button={false}
      text={experiment.accession}
    />
  </div>
);

const mapStateToProps = (state) => ({
  experiment: mapExperiment(state.experiment.selected)
});

Details = connect(mapStateToProps)(Details);

export default Details;
