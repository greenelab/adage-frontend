import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import * as d3 from 'd3';

import { initView } from './view';
import { initSimulation } from './simulation';
import { initDragHandler } from './drag';
import { initTooltip } from './tooltip';
import { setAutoFit } from './view';
import { fitView } from './view';
import { updateSimulation } from './simulation';
import { drawLinkLines } from './link-lines';
import { drawLinkHighlights } from './link-highlights';
import { drawNodeCircles } from './node-circles';
import { drawNodeHighlights } from './node-highlights';
import { drawNodeLabels } from './node-labels';
import { useBbox } from '../../../../util/hooks';

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
