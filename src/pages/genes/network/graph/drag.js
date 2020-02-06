import * as d3 from 'd3';

import { simulation } from './simulation';
import { setAutoFit } from './view';

export let dragHandler = () => null;

export let dragging = false;

export const initDragHandler = () => {
  dragHandler = d3
    .drag()
    .on('drag', onDrag)
    .on('start', onDragStart)
    .on('end', onDragEnd);
};

export const onDragStart = () => {
  setAutoFit(false);
  simulation.alphaTarget(1).restart();
  dragging = true;
};

export const onDrag = (d) => {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
  dragging = true;
};

export const onDragEnd = () => {
  simulation.alphaTarget(0).restart();
  dragging = false;
};
