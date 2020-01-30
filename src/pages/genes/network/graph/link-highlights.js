import * as d3 from 'd3';

import { tooltip } from './tooltip.js';

import { strokeWidth } from './constants.js';

export const drawLinkHighlights = ({ links }) => {
  const layer = d3.select('#graph_link_highlight_layer');

  const linkHighlights = layer.selectAll('.graph_link_highlight').data(links);

  linkHighlights
    .enter()
    .append('line')
    .merge(linkHighlights)
    .attr('class', 'graph_link_highlight')
    .attr('stroke', 'var(--blue)')
    .attr('stroke-width', strokeWidth * 4)
    .style('cursor', 'pointer')
    .on('mouseover', tooltip.show)
    .on('mouseout', tooltip.hide);

  linkHighlights.exit().remove();
};

export const positionLinkHighlights = () => {
  const highlights = d3.selectAll('.graph_link_highlight');

  highlights.attr('x1', (d) => d.source.x);
  highlights.attr('y1', (d) => d.source.y);
  highlights.attr('x2', (d) => d.target.x);
  highlights.attr('y2', (d) => d.target.y);
};
