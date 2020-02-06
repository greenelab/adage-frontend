import * as d3 from 'd3';

import { linkData } from './';

import { strokeWidth } from './constants';

// stroked link lines

export const drawLinkLines = () => {
  const layer = d3.select('#graph_link_line_layer');

  const linkLines = layer.selectAll('.graph_link_line').data(linkData);

  linkLines
    .enter()
    .append('line')
    .merge(linkLines)
    .attr('class', 'graph_link_line')
    .attr('stroke', 'var(--green)')
    .attr(
      'stroke-width',
      // base thickness on normalized weight (boosted and min-clamped)
      (d) => (0.1 + Math.pow(d.normalizedWeight, 4) * 0.9) * strokeWidth * 1.5
    )
    .style('pointer-events', 'none');

  linkLines.exit().remove();
};

export const positionLinkLines = () => {
  const lines = d3.selectAll('.graph_link_line');

  lines.attr('x1', (d) => d.source.x);
  lines.attr('y1', (d) => d.source.y);
  lines.attr('x2', (d) => d.target.x);
  lines.attr('y2', (d) => d.target.y);
};
