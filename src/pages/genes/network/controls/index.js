import React from 'react';

import Clickable from '../../../../components/clickable';
import { fitView } from '../graph/view';
import { unpinAll } from '../graph/simulation';
import { pinAll } from '../graph/simulation';
import { downloadTable } from './download';
import { downloadImage } from './download';

import { ReactComponent as FitIcon } from '../../../../images/fit.svg';
import { ReactComponent as UnpinIcon } from '../../../../images/unpin.svg';
import { ReactComponent as PinIcon } from '../../../../images/pin.svg';
import { ReactComponent as DownloadIcon } from '../../../../images/download.svg';

import './index.css';

// controls below gene network graph

const Controls = ({ nodes, links }) => (
  <>
    <div className='controls'>
      <Clickable
        text='Fit View'
        icon={<FitIcon />}
        button
        onClick={fitView}
        aria-label='Fit view to contents of graph'
      />
      <Clickable
        text='Unpin all'
        icon={<UnpinIcon />}
        button
        onClick={() => unpinAll({ nodes })}
        aria-label='Unpin all nodes'
      />
      <Clickable
        text='Pin all'
        icon={<PinIcon />}
        button
        onClick={() => pinAll({ nodes })}
        aria-label='Pin all nodes'
      />
      <Clickable
        text='Download Image'
        icon={<DownloadIcon />}
        button
        onClick={downloadImage}
        aria-label='Download gene network as .svg'
      />
      <Clickable
        text='Download Table'
        icon={<DownloadIcon />}
        button
        onClick={() => downloadTable({ links })}
        aria-label='Download gene network as .tsv for import into Cytoscape or other'
      />
    </div>
  </>
);

export default Controls;
