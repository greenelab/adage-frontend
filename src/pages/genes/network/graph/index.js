import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import * as d3 from 'd3';

import { initView } from './view.js';
import { initSimulation } from './simulation.js';
import { initDragHandler } from './drag.js';
import { initTooltip } from './tooltip.js';
import { setAutoFit } from './view.js';
import { fitView } from './view.js';
import { updateSimulation } from './simulation.js';
import { drawLinkLines } from './link-lines.js';
import { drawLinkHighlights } from './link-highlights.js';
import { drawNodeCircles } from './node-circles.js';
import { drawNodeHighlights } from './node-highlights.js';
import { drawNodeLabels } from './node-labels.js';
import { useBbox } from '../../../../util/hooks.js';

import './index.css';

export let svg;
export let view;

export let nodeData = [];
export let linkData = [];

const Graph = ({ nodes, links }) => {
  const [mounted, setMounted] = useState(false);
  const [bbox, ref] = useBbox();
  const { width, height } = bbox || {};

  svg = d3.select('#graph');
  view = d3.select('#graph_view');

  useEffect(() => {
    setAutoFit(true);
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted)
      return;

    initView();
    initSimulation();
    initDragHandler();
    initTooltip();
  }, [mounted]);

  useEffect(() => {
    fitView();
  }, [width, height]);

  useEffect(() => {
    if (!mounted)
      return;

    nodeData = nodes;
    linkData = links;
    nodeData.sort((a, b) => a.degree - b.degree);
    linkData.sort((a, b) => a.weight - b.weight);
    updateSimulation(true);
    drawLinkHighlights();
    drawLinkLines();
    drawNodeHighlights();
    drawNodeCircles();
    drawNodeLabels();
  }, [mounted, nodes, links]);

  return (
    <svg ref={ref} xmlns='http://www.w3.org/2000/svg' id='graph'>
      <g id='graph_view'>
        <g id='graph_link_highlight_layer'></g>
        <g id='graph_link_line_layer'></g>
        <g id='graph_node_highlight_layer'></g>
        <g id='graph_node_circle_layer'></g>
        <g id='graph_node_label_layer'></g>
      </g>
    </svg>
  );
};

export default Graph;