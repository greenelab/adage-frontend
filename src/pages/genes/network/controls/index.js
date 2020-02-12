import React from 'react';

import Button from '../../../../components/button';
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
    <div className='gene_network_controls'>
      <Button
        text='Fit View'
        icon={<FitIcon />}
        onClick={fitView}
        aria-label='Fit view to contents of graph'
      />
      <Button
        text='Unpin all'
        icon={<UnpinIcon />}
        onClick={() => unpinAll({ nodes })}
        aria-label='Unpin all nodes'
      />
      <Button
        text='Pin all'
        icon={<PinIcon />}
        onClick={() => pinAll({ nodes })}
        aria-label='Pin all nodes'
      />
      <Button
        text='Download Table'
        icon={<DownloadIcon />}
        onClick={() => downloadTable({ links })}
        aria-label='Download gene network as .tsv for import into Cytoscape or other'
      />
      <Button
        text='Download SVG'
        icon={<DownloadIcon />}
        onClick={downloadImage}
        aria-label='Download gene network as .svg'
      />
    </div>
  </>
);

export default Controls;
