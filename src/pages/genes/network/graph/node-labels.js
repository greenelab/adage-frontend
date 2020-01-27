import * as d3 from 'd3';

import { textColor, fontSize } from './constants.js';

export const drawNodeLabels = ({ nodes }) => {
  const layer = d3.select('#graph_node_label_layer');

  const nodeLabels = layer.selectAll('.graph_node_label').data(nodes);

  nodeLabels
    .enter()
    .append('text')
    .merge(nodeLabels)
    .attr('class', 'graph_node_label')
    .attr('fill', textColor)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .style('font-size', fontSize)
    .style('pointer-events', 'none')
    .text((d) => d.name);

  nodeLabels.exit().remove();
};

export const positionNodeLabels = () => {
  d3.selectAll('.graph_node_label').attr(
    'transform',
    (d) => 'translate(' + d.x + ',' + d.y + ')'
  );
};
