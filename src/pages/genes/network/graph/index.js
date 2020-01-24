import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import * as d3 from 'd3';

import './index.css';

window.d3 = d3;

const minZoom = 0.1;
const maxZoom = 4;
const fitPadding = 10;

export let svg;
export let view;
export let viewHandler;

const Graph = ({ nodes, links }) => {
  svg = d3.select('#graph');
  view = d3.select('#graph_view');

  const onZoom = () => view.attr('transform', d3.event.transform);
  viewHandler = d3
    .zoom()
    .scaleExtent([minZoom, maxZoom])
    .on('zoom', onZoom);
  viewHandler(svg);

  const onClick = () => null;
  svg.on('click', onClick);

  svg.on('dblclick.zoom', null);
  svg.on('dblclick', fitView);

  return (
    <svg id='graph'>
      <g id='graph_view'>
        <circle cx='100' cy='100' r='100' />
      </g>
    </svg>
  );
};

export default Graph;

export const fitView = () => {
  const container = svg.node().getBoundingClientRect();
  const contents = view.node().getBBox();

  contents.midX = contents.x + contents.width / 2;
  contents.midY = contents.y + contents.height / 2;

  let scale = Math.max(
    contents.width / (container.width - fitPadding * 2),
    contents.height / (container.height - fitPadding * 2)
  );
  scale = 1 / scale;
  if (!scale)
    scale = 1;

  const translateX = container.width / 2 - scale * contents.midX;
  const translateY = container.height / 2 - scale * contents.midY;

  console.log(container, contents, translateX, translateY, scale);

  viewHandler.transform(
    svg,
    d3.zoomIdentity.translate(translateX, translateY).scale(scale)
  );
};
