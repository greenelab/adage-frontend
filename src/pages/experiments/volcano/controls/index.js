import React from 'react';

import Clickable from '../../../../components/clickable';
import { downloadImage } from './download';

import { ReactComponent as DownloadIcon } from '../../../../images/download.svg';

import './index.css';

// controls below volcano plot

const Controls = () => (
  <div className='controls'>
    <Clickable
      text='Download Image'
      icon={<DownloadIcon />}
      button
      onClick={downloadImage}
      aria-label='Download this heatmap as an .svg file'
    />
  </div>
);

export default Controls;
