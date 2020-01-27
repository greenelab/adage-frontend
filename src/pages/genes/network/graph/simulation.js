import * as d3 from 'd3';

import { positionNodeCircles } from './node-circles.js';
import { positionLinkLines } from './link-lines.js';

import {
  nodeRadius,
  nodeDistance,
  centeringForce,
  nodeRepulsion
} from './constants.js';

export let simulation;

export const initSimulation = () => {
  simulation = d3
    .forceSimulation()
    .force('centerX', d3.forceX(0).strength(centeringForce / 100))
    .force('centerY', d3.forceY(0).strength(centeringForce / 100))
    .force(
      'collide',
      d3
        .forceCollide()
        .radius(nodeRadius)
        .strength(1)
    )
    .force(
      'link',
      d3
        .forceLink()
        .distance(nodeDistance)
        .id((d) => d.id)
    )
    .force('charge', d3.forceManyBody().strength(-nodeRepulsion));
  simulation.on('tick', onTick);
};

export const updateSimulation = ({ nodes, links, reheat }) => {
  if (!simulation || !nodes?.length || !links?.length)
    return;

  simulation.nodes(nodes);
  simulation.force('link').links(links);

  if (reheat)
    simulation.alpha(1).restart();
  else
    simulation.restart();
};

export const onTick = () => {
  positionNodeCircles();
  positionLinkLines();
};
