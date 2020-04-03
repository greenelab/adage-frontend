import React from 'react';
import { connect } from 'react-redux';

import Clickable from '../../../../components/clickable';
import { downloadImage } from './download';
import { downloadTable } from './download';

import { ReactComponent as DownloadIcon } from '../../../../images/download.svg';

import './index.css';

// controls below volcano plot

let Controls = ({ volcano }) => (
  <div className='controls'>
    <Clickable
      text='Download Image'
      icon={<DownloadIcon />}
      button
      onClick={downloadImage}
      aria-label='Download this plot as an .svg file'
    />
    <Clickable
      text='Download Table'
      icon={<DownloadIcon />}
      button
      onClick={() => downloadTable({ volcano })}
      aria-label='Download this data as a .tsv file'
    />
  </div>
);

const mapStateToProps = (state) => ({
  volcano: state.samples.volcano
});

Controls = connect(mapStateToProps)(Controls);

export default Controls;
