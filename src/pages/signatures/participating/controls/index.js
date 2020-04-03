import React from 'react';
import { connect } from 'react-redux';

import Clickable from '../../../../components/clickable';
import { downloadTable } from './download';
import { mapParticipations } from '../';

import { ReactComponent as DownloadIcon } from '../../../../images/download.svg';

import './index.css';

// controls below selected experiment samples table

let Controls = ({ participations }) => (
  <div className='controls'>
    <Clickable
      text='Download'
      icon={<DownloadIcon />}
      button
      onClick={() => downloadTable({ participations })}
      aria-label='Download this table as a .tsv file'
    />
  </div>
);

const mapStateToProps = (state) => ({
  participations: mapParticipations(state)
});

Controls = connect(mapStateToProps)(Controls);

export default Controls;
