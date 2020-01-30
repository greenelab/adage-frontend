import React from 'react';
import { renderToString } from 'react-dom/server';
import * as d3 from 'd3';
import tip from 'd3-tip';

import { svg } from './';
import { mapGeneTooltip } from '../../';
import { mapEdgeTooltip } from '../../';

export let tooltip;

export const initTooltip = () => {
  tooltip = tip()
    .attr('class', 'd3-tip')
    .html((d) => renderToString(<Tooltip {...d} />))
    .offset((d, index, array) => [
      d.link ?
        (d3.zoomTransform(svg.node()).k * array[index].getBBox().height) / 2 :
        0,
      0
    ]);

  svg.call(tooltip);
};

const Tooltip = (d) => {
  let fields = {};
  if (d.node)
    fields = { ...fields, ...mapGeneTooltip(d) };
  if (d.link)
    fields = { ...fields, ...mapEdgeTooltip(d) };
  for (const [key, value] of Object.entries(fields)) {
    if (value === '-')
      delete fields[key];
  }

  if (!Object.keys(fields).length)
    return <></>;

  const rows = Object.entries(fields).map(([key, value], index) => (
    <div key={index} className='graph_tooltip_row'>
      <span className='nowrap'>{key}</span>
      <span className='nowrap'>{value}</span>
    </div>
  ));

  return <div className='tooltip graph_tooltip text_small'>{rows}</div>;
};
