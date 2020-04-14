import * as d3 from 'd3';

import { transformString } from '../../../../util/string';
import { nodeData } from '.';
import { fontSize } from './constants';

// node text labels

export const drawNodeLabels = () => {
  const layer = d3.select('#graph_node_label_layer');

  const nodeLabels = layer.selectAll('.graph_node_label').data(nodeData);

  nodeLabels
    .enter()
    .append('text')
    .merge(nodeLabels)
    .attr('class', 'graph_node_label')
    .attr('fill', (d) => (d.selected ? '#000000' : '#ffffff'))
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .style('font-size', fontSize)
    .style('pointer-events', 'none')
    .text((d) => d.name);

  nodeLabels.exit().remove();
};

export const positionNodeLabels = () => {
  d3.selectAll('.graph_node_label').attr('transform', (d) =>
    transformString('translate', d.x, d.y));
};
