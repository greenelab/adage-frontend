import React from 'react';
import { connect } from 'react-redux';

import { mapGene } from '../';
import { isArray } from '../../../util/types.js';
import Graph from './graph';

import './index.css';

let Network = ({ nodes, links }) => {
  return <Graph nodes={nodes} links={links} />;
};

const mapStateToProps = (state) => {
  if (!isArray(state.gene.list) || !isArray(state.gene.edges))
    return {};

  let nodes = new Set();
  state.gene.edges.forEach((edge) => nodes.add(edge.gene1).add(edge.gene2));
  nodes = [...nodes];
  nodes = nodes
    .map((node) => state.gene.list.find((gene) => gene.id === node))
    .filter((node) => node)
    .map(mapGene);

  let links = state.gene.edges
    .map((edge) => ({
      ...edge,
      source: nodes.findIndex((node) => node.id === edge.gene1),
      target: nodes.findIndex((node) => node.id === edge.gene2)
    }))
    .filter((edge) => edge.source !== -1 && edge.target !== -1)
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
