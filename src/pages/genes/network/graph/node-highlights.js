import * as d3 from 'd3';

import { dragHandler } from './drag.js';
import { tooltip } from './tooltip.js';

import { nodeRadius, strokeWidth } from './constants.js';

export const drawNodeHighlights = ({ nodes }) => {
  const layer = d3.select('#graph_node_highlight_layer');

  const nodeHighlights = layer.selectAll('.graph_node_highlight').data(nodes);

  nodeHighlights
    .enter()
    .append('circle')
    .call(dragHandler)
    .merge(nodeHighlights)
    .attr('class', 'graph_node_highlight')
    .attr('r', nodeRadius + strokeWidth * 2)
    .attr('fill', 'var(--blue)')
    .style('cursor', 'pointer')
    .on('mouseover', tooltip.show)
    .on('mouseout', tooltip.hide);

  nodeHighlights.exit().remove();
};

export const positionNodeHighlights = () => {
  d3.selectAll('.graph_node_highlight').attr(
    'transform',
    (d) => 'translate(' + d.x + ',' + d.y + ')'
  );
};
