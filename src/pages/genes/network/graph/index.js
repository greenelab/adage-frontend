import React from 'react';
import { useEffect } from 'react';
import * as d3 from 'd3';

import { initView } from './view.js';
import { resetView } from './view.js';
import { initSimulation } from './simulation.js';
import { updateSimulation } from './simulation.js';
import { drawNodeCircles } from './node-circles.js';
import { drawLinkLines } from './link-lines.js';

import './index.css';

export let svg;
export let view;

const Graph = ({ nodes, links }) => {
  svg = d3.select('#graph');
  view = d3.select('#graph_view');

  const svgDefined = !svg.empty();
  const viewDefined = !view.empty();

  useEffect(() => {
    if (svgDefined && viewDefined) {
      initView();
      initSimulation();
      resetView();
    }
  }, [svgDefined, viewDefined]);

  useEffect(() => {
    updateSimulation({ nodes, links });
    drawNodeCircles({ nodes });
    drawLinkLines({ links });
  }, [nodes, links]);

  return (
    <svg id='graph'>
      <g id='graph_view'>
        <g id='graph_link_line_layer'></g>
        <g id='graph_node_circle_layer'></g>
        <g id='graph_node_label_layer'></g>
      </g>
    </svg>
  );
};

export default Graph;
