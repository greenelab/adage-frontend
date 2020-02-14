import React from 'react';
import { connect } from 'react-redux';

import FetchAlert from '../../../components/fetch-alert';
import Heatmap from './heatmap';
import { isString } from '../../../util/types';
import { isArray } from '../../../util/types';

import './index.css';

// sample activities section

let Activities = ({ activities }) => (
  <>
    {isString(activities) && (
      <FetchAlert status={activities} subject='activities' />
    )}
    {isArray(activities) && <Heatmap />}
  </>
);

const mapStateToProps = (state) => ({
  activities: state.sample.activities
});

Activities = connect(mapStateToProps)(Activities);

export default Activities;
