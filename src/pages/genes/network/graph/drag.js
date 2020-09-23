import * as d3 from 'd3';

import { simulation } from './simulation';
import { setAutoFit } from './view';

export let dragHandler = () => null;

export let dragging = false;

// create drag handler
export const initDragHandler = () => {
  dragHandler = d3
    .drag()
    .on('drag', onDrag)
    .on('start', onDragStart)
    .on('end', onDragEnd);
};

// when drag starts
export const onDragStart = () => {
  setAutoFit(false);
  simulation.alphaTarget(1).restart();
  dragging = true;
};

// during dragging
export const onDrag = (event, d) => {
  d.fx = event.x;
  d.fy = event.y;
  dragging = true;
};

// when drag ends
export const onDragEnd = () => {
  simulation.alphaTarget(0).restart();
  dragging = false;
};
