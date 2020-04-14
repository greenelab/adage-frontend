import React from 'react';
import { connect } from 'react-redux';

import Clickable from '../../../../components/clickable';
import { downloadTable } from './download';

import { ReactComponent as DownloadIcon } from '../../../../images/download.svg';

import './index.css';

// controls below enriched gene sets table

let Controls = ({ enrichedGenes }) => (
  <div className='controls'>
    <Clickable
      text='Download'
      icon={<DownloadIcon />}
      button
      onClick={() => downloadTable({ enrichedGenes })}
      aria-label='Download this table as a .tsv file'
    />
  </div>
);

const mapStateToProps = (state) => ({
  enrichedGenes: state.signatures.enrichedGenes
});

Controls = connect(mapStateToProps)(Controls);

export default Controls;
