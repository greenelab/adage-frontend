import * as d3 from 'd3';

import { nodeRadius, fillA, fillB } from './constants.js';

export const drawNodeCircles = ({ nodes }) => {
  const layer = d3.select('#graph_node_circle_layer');

  const nodeCircles = layer.selectAll('.graph_node_circle').data(nodes);

  nodeCircles
    .enter()
    .append('circle')
    .merge(nodeCircles)
    .attr('class', 'graph_node_circle')
    .attr('r', nodeRadius)
    .attr('fill', (d) => (d.selected ? fillA : fillB))
    .style('cursor', 'pointer');

  nodeCircles.exit().remove();
};

export const positionNodeCircles = () => {
  d3.selectAll('.graph_node_circle').attr(
    'transform',
    (d) => 'translate(' + d.x + ',' + d.y + ')'
  );
};
