import * as d3 from 'd3';

import { positionLinkLines } from './link-lines.js';
import { positionNodeCircles } from './node-circles.js';
import { positionNodeLabels } from './node-labels.js';

import {
  nodeRadius,
  nodeDistance,
  nodeRepulsion,
  centerForce
} from './constants.js';

export let simulation;

export const initSimulation = () => {
  simulation = d3
    .forceSimulation()
    .force('collide', d3.forceCollide().radius(nodeRadius * 2))
    .force(
      'link',
      d3
        .forceLink()
        .distance(nodeDistance)
        .id((d) => d.id)
    )
    .force(
      'charge',
      d3
        .forceManyBody()
        .strength(-nodeRepulsion)
        .distanceMin(nodeRadius * 2)
        .distanceMax(nodeDistance * 2)
    )
    .force('centerX', d3.forceX(0).strength(centerForce))
    .force('centerY', d3.forceY(0).strength(centerForce))
    .on('tick', onTick);
};

export const updateSimulation = ({ nodes, links, reheat }) => {
  if (!simulation)
    return;

  simulation.nodes(nodes);
  simulation.force('link').links(links);

  if (reheat)
    simulation.alpha(1).restart();
  else
    simulation.restart();
};

export const onTick = () => {
  positionLinkLines();
  positionNodeCircles();
  positionNodeLabels();
};

export const unpinAll = ({ nodes }) => {
  nodes.forEach((node) => {
    node.fx = null;
    node.fy = null;
  });

  simulation.alpha(1).restart();
};

export const pinAll = ({ nodes }) => {
  nodes.forEach((node) => {
    node.fx = node.x;
    node.fy = node.y;
  });
};
