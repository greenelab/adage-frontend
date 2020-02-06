import * as d3 from 'd3';

import { dragHandler } from './drag';
import { openTooltip } from './tooltip';
import { closeTooltip } from './tooltip';

import { nodeData } from './';

import { nodeRadius, strokeWidth } from './constants';

// node highlight and mouse hitbox

export const drawNodeHighlights = () => {
  const layer = d3.select('#graph_node_highlight_layer');

  const nodeHighlights = layer
    .selectAll('.graph_node_highlight')
    .data(nodeData);

  nodeHighlights
    .enter()
    .append('circle')
    .call(dragHandler)
    .merge(nodeHighlights)
    .attr('class', 'graph_node_highlight')
    .attr('r', nodeRadius + strokeWidth * 2)
    .attr('fill', 'var(--blue)')
    .style('cursor', 'pointer')
    .on('mouseover', openTooltip)
    .on('mouseout', closeTooltip);

  nodeHighlights.exit().remove();
};

export const positionNodeHighlights = () => {
  d3.selectAll('.graph_node_highlight').attr(
    'transform',
    (d) => 'translate(' + d.x + ',' + d.y + ')'
  );
};
