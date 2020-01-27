import React from 'react';
import { connect } from 'react-redux';

import { mapGene } from '../';
import { isArray } from '../../../util/types.js';
import { resetView } from './graph/view';
import Graph from './graph';

import './index.css';

let Network = ({ nodes, links }) => {
  return (
    <>
      <button onClick={resetView}>reset view</button>
      <Graph nodes={nodes} links={links} />
    </>
  );
};

const mapStateToProps = (state) => {
  if (!isArray(state.gene.list) || !isArray(state.gene.edges))
    return { nodes: [], links: [] };

  let nodes = new Set();
  state.gene.edges.forEach((edge) => nodes.add(edge.gene1).add(edge.gene2));
  state.gene.selected.forEach((selected) => nodes.add(selected.id));
  nodes = [...nodes];
  nodes = nodes
    .map((node) => state.gene.list.find((gene) => gene.id === node))
    .filter((node) => node)
    .map(mapGene)
    .map((gene) => ({
      ...gene,
      selected:
        state.gene.selected.find((selected) => selected.id === gene.id) !==
        undefined
    }));

  let links = state.gene.edges
    .map((edge) => ({
      ...edge,
      source: edge.gene1,
      target: edge.gene2
    }))
    .map((edge) => ({ ...edge, normalizedWeight: edge.weight }));

  if (links.length) {
    const weights = links.map((link) => link.weight);
    const minWeight = Math.min(...weights);
    const maxWeight = Math.max(...weights);
    links = links.map((link) => ({
      ...link,
      normalizedWeight: (link.weight - minWeight) / (maxWeight - minWeight)
    }));
  }

  return { nodes, links };
};

Network = connect(mapStateToProps)(Network);

export default Network;
