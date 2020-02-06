import * as d3 from 'd3';

import { nodeData } from './';

import { nodeRadius, fillA, fillB, stroke, strokeWidth } from './constants';

export const drawNodeCircles = () => {
  const layer = d3.select('#graph_node_circle_layer');

  const nodeCircles = layer.selectAll('.graph_node_circle').data(nodeData);

  nodeCircles
    .enter()
    .append('circle')
    .merge(nodeCircles)
    .attr('class', 'graph_node_circle')
    .attr('r', nodeRadius)
    .attr('fill', (d) => (d.selected ? fillA : fillB))
    .attr('stroke', stroke)
    .attr('stroke-width', strokeWidth)
    .style('pointer-events', 'none');

  nodeCircles.exit().remove();
};

export const positionNodeCircles = () => {
  d3.selectAll('.graph_node_circle').attr(
    'transform',
    (d) => 'translate(' + d.x + ',' + d.y + ')'
  );
};
