import React from 'react';

import Tooltip from '../../../../components/tooltip';
import Button from '../../../../components/button';
import { fitView } from '../graph/view';
import { unpinAll } from '../graph/simulation';
import { pinAll } from '../graph/simulation';
import { download } from './download';

import { ReactComponent as FitIcon } from '../../../../images/fit.svg';
import { ReactComponent as UnpinIcon } from '../../../../images/unpin.svg';
import { ReactComponent as PinIcon } from '../../../../images/pin.svg';
import { ReactComponent as DownloadIcon } from '../../../../images/download.svg';

import './index.css';

// controls below gene network graph

const Controls = ({ nodes }) => (
  <>
    <div className='gene_network_controls'>
      <Tooltip text='Fit view to contents of graph'>
        <Button text='Fit View' icon={<FitIcon />} onClick={fitView} />
      </Tooltip>
      <Tooltip text='Unpin all nodes'>
        <Button
          text='Unpin all'
          icon={<UnpinIcon />}
          onClick={() => unpinAll({ nodes })}
        />
      </Tooltip>
      <Tooltip text='Pin all nodes'>
        <Button
          text='Pin all'
          icon={<PinIcon />}
          onClick={() => pinAll({ nodes })}
        />
      </Tooltip>
      <Tooltip text='Download gene network as .svg'>
        <Button text='Download .svg' icon={<DownloadIcon />} onClick={download} />
      </Tooltip>
    </div>
  </>
);

export default Controls;
