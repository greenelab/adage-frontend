import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import * as d3 from 'd3';

import { initView, setAutoFit } from './view.js';
import { fitView } from './view.js';
import { initSimulation } from './simulation.js';
import { updateSimulation } from './simulation.js';
import { initDragHandler } from './drag.js';
import { drawLinkLines } from './link-lines.js';
import { drawNodeCircles } from './node-circles.js';
import { drawNodeLabels } from './node-labels.js';
import { useBbox } from '../../../../util/hooks.js';

import './index.css';

export let svg;
export let view;

const Graph = ({ nodes, links }) => {
  const [mounted, setMounted] = useState(false);
  const [bbox, ref] = useBbox();

  svg = d3.select('#graph');
  view = d3.select('#graph_view');

  useEffect(() => {
    setAutoFit(true);
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    fitView();
  }, [bbox]);

  useEffect(() => {
    if (!mounted)
      return;
    initView();
    initSimulation();
    initDragHandler();
  }, [mounted]);

  useEffect(() => {
    if (!mounted)
      return;
    updateSimulation({ nodes, links, reheat: true });
    drawLinkLines({ links });
    drawNodeCircles({ nodes });
    drawNodeLabels({ nodes });
  }, [mounted, nodes, links]);

  return (
    <svg ref={ref} xmlns='http://www.w3.org/2000/svg' id='graph'>
      <g id='graph_view'>
        <g id='graph_link_line_layer'></g>
        <g id='graph_node_circle_layer'></g>
        <g id='graph_node_label_layer'></g>
      </g>
    </svg>
  );
};

export default Graph;
