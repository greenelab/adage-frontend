import * as d3 from 'd3';

import { fitPadding, minZoom, maxZoom, defaultZoom } from './constants.js';
import { svg, view } from './';

export let viewHandler = () => null;

export const initView = () => {
  viewHandler = d3
    .zoom()
    .scaleExtent([minZoom, maxZoom])
    .on('zoom', onZoom);
  viewHandler(svg);

  svg.on('dblclick.zoom', null);
  svg.on('dblclick', fitView);
};

export const onZoom = () => view.attr('transform', d3.event.transform);

export const resetView = () => {
  const container = svg.node().getBoundingClientRect();

  const scale = defaultZoom;
  const translateX = container.width / 2;
  const translateY = container.height / 2;

  viewHandler.transform(
    svg,
    d3.zoomIdentity.translate(translateX, translateY).scale(scale)
  );
};

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

  viewHandler.transform(
    svg,
    d3.zoomIdentity.translate(translateX, translateY).scale(scale)
  );
};
