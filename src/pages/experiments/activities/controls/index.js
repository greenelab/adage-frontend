import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useCallback } from 'react';

import { OrderContext } from '../../order';
import Clickable from '../../../../components/clickable';
import { downloadImage } from './download';
import { downloadTable } from './download';

import { ReactComponent as LoadingIcon } from '../../../../images/loading.svg';
import { ReactComponent as BiArrowIcon } from '../../../../images/bi-arrow.svg';
import { ReactComponent as CrossIcon } from '../../../../images/cross.svg';
import { ReactComponent as DownloadIcon } from '../../../../images/download.svg';

import worker from 'workerize-loader!../../../../util/math';

import './index.css';

// cluster process vars to only take most recent cluster results
let sampleProcess;
let signatureProcess;

// controls below activity heatmap

const Controls = ({ activities }) => {
  const [sortingSamples, setSortingSamples] = useState(false);
  const [sortingSignatures, setSortingSignatures] = useState(false);
  const { changeSampleOrder, changeSignatureOrder, resetOrders } = useContext(
    OrderContext
  );

  // sort samples with clustering
  const sortSamples = useCallback(async () => {
    // if already sorting, don't sort again
    if (sampleProcess)
      return;

    // set status to sorting
    setSortingSamples(true);
    const processId = window.performance.now();
    sampleProcess = processId;

    // cluster
    const newSamples = await worker().clusterActivities({
      activities,
      prop: 'sample'
    });

    // if new sort or sort reset in meantime, exit and disregard results
    if (sampleProcess !== processId)
      return;

    // set new
    changeSampleOrder(newSamples);

    // set status to done
    setSortingSamples(false);
    sampleProcess = undefined;
  }, [activities, changeSampleOrder]);

  // sort signatures with clustering
  const sortSignatures = useCallback(async () => {
    // if already sorting, don't sort again
    if (signatureProcess)
      return;

    // set status to sorting
    setSortingSignatures(true);
    const processId = window.performance.now();
    signatureProcess = processId;

    // cluster
    const newSignatures = await worker().clusterActivities({
      activities,
      prop: 'signature'
    });

    // if new sort or sort reset in meantime, exit and disregard results
    if (signatureProcess !== processId)
      return;

    // set new
    changeSignatureOrder(newSignatures);

    // set status to done
    setSortingSignatures(false);
    signatureProcess = undefined;
  }, [activities, changeSignatureOrder]);

  const resetSorting = useCallback(() => {
    setSortingSamples(false);
    sampleProcess = undefined;
    setSortingSignatures(false);
    signatureProcess = undefined;
    resetOrders();
  }, [resetOrders]);

  return (
    <>
      <div className='controls'>
        <Clickable
          text='Cluster Samples'
          icon={
            sortingSamples ? (
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
          icon={sortingSignatures ? <LoadingIcon /> : <BiArrowIcon />}
          button
          onClick={sortSignatures}
          aria-label='Cluster heatmap by signature (re-order columns)'
        />
        <Clickable
          text='Reset'
          icon={<CrossIcon />}
          button
          onClick={resetSorting}
          aria-label='Reset heatmap'
        />
      </div>
      <div className='controls'>
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
    </>
  );
};

export default Controls;
