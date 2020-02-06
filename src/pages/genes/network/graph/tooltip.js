import React from 'react';
import { renderToString } from 'react-dom/server';
import * as d3 from 'd3';
import tip from 'd3-tip';

import { svg } from './';

const delay = 100;

export let tooltip;

// create tooltip that triggers on d3 element hover
export const initTooltip = () => {
  tooltip = tip()
    .attr('class', 'd3-tip')
    // the html of the tooltip. since d3-tip does not accept react components,
    // use server-side rendering function to convert component to html string
    .html((d) => renderToString(<Tooltip {...d} />))
    // set tooltip offset from anchor element
    .offset((d, index, array) => {
      // if tooltip for a link, put over midpoint of line, accounting for view
      // zoom. otherwise, no offset.
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

// tooltip component to render as string

const Tooltip = (d) => {
  let fields = {};
  if (d.node)
    fields = { ...fields, ...mapGeneTooltip(d) };
  if (d.link)
    fields = { ...fields, ...mapEdgeTooltip(d) };

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

// when tooltip opens
export const openTooltip = (...args) => {
  const [, index, array] = args;
  const thisArg = array[index];

  window.clearTimeout(timer);
  timer = window.setTimeout(() => tooltip.show.apply(thisArg, args), delay);
};

// when tooltip closes
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
