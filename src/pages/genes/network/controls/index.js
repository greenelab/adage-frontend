import React from 'react';

import Tooltip from '../../../../components/tooltip';
import Button from '../../../../components/button';
import { fitView } from '../graph/view.js';
import { unpinAll } from '../graph/simulation.js';
import { pinAll } from '../graph/simulation.js';
import { download } from './download.js';

import { ReactComponent as Fit } from '../../../../images/fit.svg';
import { ReactComponent as Unpin } from '../../../../images/unpin.svg';
import { ReactComponent as Pin } from '../../../../images/pin.svg';
import { ReactComponent as Download } from '../../../../images/download.svg';

import './index.css';

const Controls = ({ nodes }) => (
  <div className='gene_network_controls'>
    <Tooltip text='Fit view to contents of graph'>
      <Button text='Fit View' icon={<Fit />} onClick={fitView} />
    </Tooltip>
    <Tooltip text='Unpin all nodes'>
      <Button
        text='Unpin all'
        icon={<Unpin />}
        onClick={() => unpinAll({ nodes })}
      />
    </Tooltip>
    <Tooltip text='Pin all nodes'>
      <Button
        text='Pin all'
        icon={<Pin />}
        onClick={() => pinAll({ nodes })}
      />
    </Tooltip>
    <Tooltip text='Download gene network as .svg'>
      <Button text='Download' icon={<Download />} onClick={download} />
    </Tooltip>
  </div>
);

export default Controls;
