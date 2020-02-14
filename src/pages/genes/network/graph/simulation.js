import * as d3 from 'd3';

import { positionLinkLines } from './link-lines';
import { positionLinkHighlights } from './link-highlights';
import { positionNodeCircles } from './node-circles';
import { positionNodeHighlights } from './node-highlights';
import { positionNodeLabels } from './node-labels';
import { autoFit } from './view';
import { setAutoFit } from './view';
import { fitView } from './view';
import { nodeData } from '.';
import { linkData } from '.';

import {
  nodeRadius,
  nodeDistance,
  nodeRepulsion,
  centerForce
} from './constants';

export let simulation;

// create force/physics based simulation to detangle nodes
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
    .on('tick', onTick)
    .on('end', onEnd);
};

// update simulation with new data and reheat
export const updateSimulation = (reheat) => {
  if (!simulation)
    return;

  simulation.nodes(nodeData);
  simulation.force('link').links(linkData);

  if (reheat)
    simulation.alpha(1).restart();
  else
    simulation.restart();
};

// when simulation ticks forward
const onTick = () => {
  positionLinkLines();
  positionLinkHighlights();
  positionNodeCircles();
  positionNodeHighlights();
  positionNodeLabels();

  if (autoFit)
    fitView();
};

// when simulation stops (reaches rest)
const onEnd = () => {};

// unpin all nodes by removing their fixed positions
export const unpinAll = () => {
  nodeData.forEach((node) => {
    node.fx = null;
    node.fy = null;
  });

  setAutoFit(true);

  simulation.alpha(1).restart();
};

// pin all nodes by fixing their positions
export const pinAll = () => {
  nodeData.forEach((node) => {
    node.fx = node.x;
    node.fy = node.y;
  });

  setAutoFit(false);

  simulation
    .alpha(0)
    .alphaTarget(0)
    .stop();
};
