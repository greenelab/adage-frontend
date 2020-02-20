import * as d3 from 'd3';

import { transformString } from '../../../../util/string';
import { stringifyObject } from '../../../../util/object';
import { dragHandler } from './drag';
import { nodeData } from '.';
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
    .attr('aria-label', (d) =>
      stringifyObject({
        standardName: d.standardName,
        systematicName: d.systematicName,
        entrezId: d.entrezId,
        description: d.description
      })
    );

  nodeHighlights.exit().remove();
};

export const positionNodeHighlights = () => {
  d3.selectAll('.graph_node_highlight').attr(
    'transform',
    (d) => transformString('translate', d.x, d.y)
  );
};
