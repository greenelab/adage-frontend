import React from 'react';
import { connect } from 'react-redux';

import Clickable from '../../../../components/clickable';
import { mapActivities } from '../';
import { downloadTable } from './download';

import { ReactComponent as DownloadIcon } from '../../../../images/download.svg';

import './index.css';

// controls below activity heatmap

let Controls = ({ activities }) => (
  <div className='controls'>
    <Clickable
      text='Download'
      icon={<DownloadIcon />}
      button
      onClick={() => downloadTable({ activities })}
      aria-label='Download this heatmap as a .tsv file'
    />
  </div>
);

const mapStateToProps = (state) => ({
  activities: mapActivities(state.sample.activities, state)
});

Controls = connect(mapStateToProps)(Controls);

export default Controls;
