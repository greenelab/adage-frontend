import React from 'react';

import Slider from '../../../../components/slider';
import Tooltip from '../../../../components/tooltip';

import { ReactComponent as Genes } from '../../../../images/genes.svg';
import { ReactComponent as Link } from '../../../../images/link.svg';

import './index.css';

const Filters = ({
  selectedNodes,
  filteredNodes,
  filteredLinks,
  fullNodes,
  fullLinks,
  nodeCutoff,
  setNodeCutoff,
  edgeWeightCutoff,
  setEdgeWeightCutoff
}) => (
  <>
    <Slider
      title='Node cutoff'
      value={nodeCutoff}
      min={selectedNodes}
      max={fullNodes}
      step={1}
      onChange={setNodeCutoff}
    />
    <Slider
      title='Edge weight cutoff'
      value={edgeWeightCutoff}
      min={0.4}
      max={1}
      step={0.01}
      reverse
      onChange={setEdgeWeightCutoff}
    />
    <div className='gene_network_info medium'>
      <Tooltip
        text={
          'Showing ' + filteredNodes + ' of ' + fullNodes + ' nodes (genes)'
        }
      >
        <span>
          <Genes />
          {filteredNodes} of {fullNodes}
        </span>
      </Tooltip>
      <Tooltip
        text={
          'Showing ' + filteredLinks + ' of ' + fullLinks + ' edges (links)'
        }
      >
        <span>
          <Link />
          {filteredLinks} of {fullLinks}
        </span>
      </Tooltip>
    </div>
  </>
);

export default Filters;
