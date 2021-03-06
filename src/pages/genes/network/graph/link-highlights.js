import * as d3 from 'd3';

import { stringifyObject } from '../../../../util/object';
import { linkData } from '.';
import { strokeWidth } from './constants';

// link highlight and mouse hitbox

export const drawLinkHighlights = () => {
  const layer = d3.select('#graph_link_highlight_layer');

  const linkHighlights = layer
    .selectAll('.graph_link_highlight')
    .data(linkData);

  linkHighlights
    .enter()
    .append('line')
    .merge(linkHighlights)
    .attr('class', 'graph_link_highlight')
    .attr('stroke', 'var(--blue)')
    .attr('stroke-width', strokeWidth * 4)
    .style('cursor', 'pointer')
    .attr('aria-label', (d) => stringifyObject({ weight: d.weight.toFixed(5) }))
    .attr('data-tooltip-h-align', 'center')
    .attr('data-tooltip-v-align', 'center');

  linkHighlights.exit().remove();
};

export const positionLinkHighlights = () => {
  const highlights = d3.selectAll('.graph_link_highlight');

  highlights.attr('x1', (d) => d.source.x);
  highlights.attr('y1', (d) => d.source.y);
  highlights.attr('x2', (d) => d.target.x);
  highlights.attr('y2', (d) => d.target.y);
};
