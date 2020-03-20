import React from 'react';
import { connect } from 'react-redux';

import Clickable from '../../../../components/clickable';
import { downloadTable } from './download';

import { ReactComponent as DownloadIcon } from '../../../../images/download.svg';

import './index.css';

// controls below enriched signatures table

let Controls = ({ enrichedSignatures }) => (
  <div className='controls'>
    <Clickable
      text='Download'
      icon={<DownloadIcon />}
      button
      onClick={() => downloadTable({ enrichedSignatures })}
      aria-label='Download this table as a .tsv file'
    />
  </div>
);

const mapStateToProps = (state) => ({
  enrichedSignatures: state.genes.enrichedSignatures
});

Controls = connect(mapStateToProps)(Controls);

export default Controls;
