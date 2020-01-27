import React from 'react';

import Tooltip from '../../../../components/tooltip';
import Button from '../../../../components/button';
import { fitView } from '../graph/view.js';
import { unpinAll } from '../graph/simulation.js';
import { pinAll } from '../graph/simulation.js';
import { download } from './download.js';

import { ReactComponent as Cross } from '../../../../images/cross.svg';
import { ReactComponent as Download } from '../../../../images/download.svg';

import './index.css';

const Controls = ({ nodes }) => (
  <div className='gene_network_controls'>
    <Tooltip text='Fit view to contents of graph'>
      <Button text='Fit View' icon={<Cross />} onClick={fitView} />
    </Tooltip>
    <Tooltip text='Unpin all nodes'>
      <Button
        text='Unpin all'
        icon={<Cross />}
        onClick={() => unpinAll({ nodes })}
      />
    </Tooltip>
    <Tooltip text='Pin all nodes'>
      <Button
        text='Pin all'
        icon={<Cross />}
        onClick={() => pinAll({ nodes })}
      />
    </Tooltip>
    <Tooltip text='Download gene network as .svg'>
      <Button text='Download' icon={<Download />} onClick={download} />
    </Tooltip>
  </div>
);

export default Controls;
