import * as d3 from 'd3';

import { simulation } from './simulation.js';

export let dragHandler = () => null;

export const initDragHandler = () => {
  dragHandler = d3
    .drag()
    .on('drag', onDrag)
    .on('start', onDragStart)
    .on('end', onDragEnd);
};

export const onDragStart = () => {
  simulation.alphaTarget(1).restart();
};

export const onDrag = (d) => {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
};

export const onDragEnd = () => {
  simulation.alphaTarget(0).restart();
};
