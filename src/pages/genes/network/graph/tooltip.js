import React from 'react';
import { renderToString } from 'react-dom/server';
import * as d3 from 'd3';
import tip from 'd3-tip';

import { svg } from './';

const delay = 100;

export let tooltip;

export const initTooltip = () => {
  tooltip = tip()
    .attr('class', 'd3-tip')
    .html((d) => renderToString(<Tooltip {...d} />))
    .offset((d, index, array) => {
      if (d.link) {
        return [
          (d3.zoomTransform(svg.node()).k * array[index].getBBox().height) / 2,
          0
        ];
      } else
        return [0, 0];
    });

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

let timer;

export const openTooltip = (...args) => {
  const [, index, array] = args;
  const thisArg = array[index];

  window.clearTimeout(timer);
  timer = window.setTimeout(() => tooltip.show.apply(thisArg, args), delay);
};

export const closeTooltip = () => {
  window.clearTimeout(timer);
  tooltip.hide();
};

const mapGeneTooltip = (gene) => ({
  'Standard Name': gene.standardName,
  'Systematic Name': gene.systematicName,
  'Entrez Id': gene.entrezId,
  'Description': gene.description,
  'Aliases': gene.aliases,
  'Organism': gene.organism
});

const mapEdgeTooltip = (link) => ({
  Weight: link.weight.toFixed(4) || '-'
});
