import React from 'react';

import Clickable from '../../../../components/clickable';
import { downloadImage } from './download';
import { downloadTable } from './download';
import { actionStatuses } from '../../../../actions/fetch';

import { ReactComponent as LoadingIcon } from '../../../../images/loading.svg';
import { ReactComponent as BiArrowIcon } from '../../../../images/bi-arrow.svg';
import { ReactComponent as DownloadIcon } from '../../../../images/download.svg';

import './index.css';

// controls below activity heatmap

const Controls = ({
  activities,
  sortedSamples,
  sortedSignatures,
  sortSamples,
  sortSignatures
}) => (
  <div className='controls'>
    <Clickable
      text='Cluster Samples'
      icon={
        sortedSamples === actionStatuses.LOADING ? (
          <LoadingIcon />
        ) : (
          <BiArrowIcon className='rotate_cw' />
        )
      }
      button
      onClick={sortSamples}
      aria-label='Cluster heatmap by sample (re-order rows)'
    />
    <Clickable
      text='Cluster Signatures'
      icon={
        sortedSignatures === actionStatuses.LOADING ? (
          <LoadingIcon />
        ) : (
          <BiArrowIcon />
        )
      }
      button
      onClick={sortSignatures}
      aria-label='Cluster heatmap by signature (re-order columns)'
    />
    <Clickable
      text='Download Image'
      icon={<DownloadIcon />}
      button
      onClick={downloadImage}
      aria-label='Download this heatmap as an .svg file'
    />
    <Clickable
      text='Download Table'
      icon={<DownloadIcon />}
      button
      onClick={() => downloadTable({ activities })}
      aria-label='Download this heatmap as a .tsv file'
    />
  </div>
);

export default Controls;
