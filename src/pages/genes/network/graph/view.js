import * as d3 from 'd3';

import { fitPadding, minZoom, maxZoom } from './constants';
import { svg } from './';
import { view } from './';

export let viewHandler = () => null;

// create view handler
export const initView = () => {
  viewHandler = d3
    .zoom()
    .scaleExtent([minZoom, maxZoom])
    .on('zoom', onZoom);
  viewHandler(svg);

  svg.on('dblclick.zoom', null);
  svg.on('dblclick', fitView);
};

// when view is panned or zoomed
export const onZoom = () => {
  if (d3.event.sourceEvent)
    setAutoFit(false);
  view.attr('transform', d3.event.transform);
};

// fit view to contents of graph
export const fitView = () => {
  const container = svg?.node()?.getBoundingClientRect();
  const contents = view?.node()?.getBBox();

  if (
    !viewHandler ||
    !container?.width ||
    !container?.height ||
    !contents?.width ||
    !contents?.height
  )
    return;

  contents.midX = contents.x + contents.width / 2;
  contents.midY = contents.y + contents.height / 2;

  let scale = Math.max(
    contents.width / (container.width - fitPadding * 2),
    contents.height / (container.height - fitPadding * 2)
  );
  scale = 1 / scale;
  if (!scale)
    scale = 1;
  if (scale < minZoom)
    scale = minZoom;
  if (scale > maxZoom)
    scale = maxZoom;

  const translateX = container.width / 2 - scale * contents.midX;
  const translateY = container.height / 2 - scale * contents.midY;

  viewHandler.transform(
    svg,
    d3.zoomIdentity.translate(translateX, translateY).scale(scale),
    'fit'
  );
};

// "global" var to say whether view is fit on every simulation tick
export let autoFit = true;

// set autoFit var from outside this module
export const setAutoFit = (value) => (autoFit = value);
