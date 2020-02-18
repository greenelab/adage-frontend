import React from 'react';

import Clickable from '../../../../components/clickable';
import { downloadTable } from './download';
import { actionStatuses } from '../../../../actions/fetch';

import { ReactComponent as LoadingIcon } from '../../../../images/loading.svg';
import { ReactComponent as BiArrowIcon } from '../../../../images/bi-arrow.svg';
import { ReactComponent as DownloadIcon } from '../../../../images/download.svg';

import './index.css';

// controls below activity heatmap

const Controls = ({
  activities,
  clusteredSamples,
  clusteredSignatures,
  clusterSamples,
  clusterSignatures
}) => (
  <div className='controls'>
    <Clickable
      text='Cluster Samples'
      icon={
        clusteredSamples === actionStatuses.LOADING ? (
          <LoadingIcon />
        ) : (
          <BiArrowIcon className='rotate_cw' />
        )
      }
      button
      onClick={clusterSamples}
      aria-label='Cluster heatmap by sample (re-order rows)'
    />
    <Clickable
      text='Cluster Signatures'
      icon={
        clusteredSignatures === actionStatuses.LOADING ? (
          <LoadingIcon />
        ) : (
          <BiArrowIcon />
        )
      }
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
