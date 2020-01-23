import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import * as vega from 'vega';

import { useBbox } from '../../../../util/hooks.js';

import './index.css';

import spec from './spec.json';

const Graph = ({ nodes, links }) => {
  const [containerBbox, containerRef] = useBbox();
  const viewRef = useRef();

  useEffect(() => {
    viewRef.current = new vega.View(vega.parse(spec), {
      container: containerRef.current
    });
    viewRef.current.runAsync();
  }, [containerRef, viewRef]);

  useEffect(() => {
    if (!viewRef.current)
      return;

    viewRef.current.change(
      'nodeData',
      vega
        .changeset()
        .remove(() => true)
        .insert(nodes)
    );
    viewRef.current.change(
      'linkData',
      vega
        .changeset()
        .remove(() => true)
        .insert(links)
    );
    viewRef.current.runAsync();
  }, [nodes, links]);

  useEffect(() => {
    if (!viewRef.current || !containerBbox)
      return;

    viewRef.current.width(containerBbox.width);
    viewRef.current.height(containerBbox.height);
  }, [containerBbox]);

  window.view = viewRef.current;

  return <div ref={containerRef} id='graph'></div>;
};

export default Graph;
