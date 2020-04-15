import React from 'react';
import { connect } from 'react-redux';

import Clickable from '../../../../components/clickable';
import { downloadTable } from './download';
import { mapActivities } from '../';

import { ReactComponent as DownloadIcon } from '../../../../images/download.svg';

import './index.css';

// controls below signature experiment activities section

let Controls = ({ byExperiment }) => (
  <div className='controls'>
    <Clickable
      text='Download'
      icon={<DownloadIcon />}
      button
      onClick={() => downloadTable({ byExperiment })}
      aria-label='Download this table as a .tsv file'
    />
  </div>
);

const mapStateToProps = (state) =>
  mapActivities(state.signatures.activities, state);

Controls = connect(mapStateToProps)(Controls);

export default Controls;
