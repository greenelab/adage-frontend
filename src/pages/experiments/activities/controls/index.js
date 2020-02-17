import React from 'react';

import Clickable from '../../../../components/clickable';
import { downloadTable } from './download';

import { ReactComponent as BiArrowIcon } from '../../../../images/bi-arrow.svg';
import { ReactComponent as DownloadIcon } from '../../../../images/download.svg';

import './index.css';

// controls below activity heatmap

let Controls = ({ activities, clusterSamples, clusterSignatures }) => (
  <div className='controls'>
    <Clickable
      text='Cluster Samples'
      icon={<BiArrowIcon className='rotate_cw' />}
      button
      onClick={clusterSamples}
      aria-label='Cluster heatmap by sample (re-order rows)'
    />
    <Clickable
      text='Cluster Signatures'
      icon={<BiArrowIcon />}
      button
      onClick={clusterSignatures}
      aria-label='Cluster heatmap by signature (re-order columns)'
    />
    <Clickable
      text='Download'
      icon={<DownloadIcon />}
      button
      onClick={() => downloadTable({ activities })}
      aria-label='Download this heatmap as a .tsv file'
    />
  </div>
);

export default Controls;
