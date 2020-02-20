import React from 'react';
import { useEffect } from 'react';
import * as d3 from 'd3';

import { initView } from './view';
import { initSimulation } from './simulation';
import { initDragHandler } from './drag';
import { setAutoFit } from './view';
import { fitView } from './view';
import { updateSimulation } from './simulation';
import { drawLinkLines } from './link-lines';
import { drawLinkHighlights } from './link-highlights';
import { drawNodeCircles } from './node-circles';
import { drawNodeHighlights } from './node-highlights';
import { drawNodeLabels } from './node-labels';
import { useBbox } from '../../../../util/hooks';
import { useMounted } from '../../../../util/hooks';

import './index.css';

// "global" var to conveniently access d3 selections of the svg and view
// group layer
export let svg;
export let view;

// "global" vars for node and link data
export let nodeData = [];
export let linkData = [];

// graph network display component

const Graph = ({ nodes, links }) => {
  // internal state
  const mounted = useMounted();
  const [bbox, ref] = useBbox();
  const { width, height } = bbox || {};

  svg = d3.select('#graph');
  view = d3.select('#graph_view');

  // reset auto fit
  useEffect(() => {
    setAutoFit(true);
  });

  // only once, after first render
  useEffect(() => {
    if (!mounted)
      return;

    // initialize graph
    initView();
    initSimulation();
    initDragHandler();
  }, [mounted]);

  // fit view when graph container dimensions change
  useEffect(() => {
    fitView();
  }, [width, height]);

  // update data, simulation, and scene elements on incoming data change
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
