import React from 'react';
import { connect } from 'react-redux';

import FetchAlert from '../../../components/fetch-alert';
import { mapGene } from '../';
import { isArray } from '../../../util/types.js';
import Graph from './graph';
import Controls from './controls';

import './index.css';

let Network = ({ nodes, links, edges }) => (
  <>
    {(!nodes?.length || !links?.length) && (
      <FetchAlert status={edges} subject='edges' />
    )}
    {!(!nodes?.length || !links?.length) && (
      <>
        <Graph nodes={nodes} links={links} />
        <Controls nodes={nodes} links={links} />
      </>
    )}
  </>
);

const mapStateToProps = (state) => {
  if (
    !isArray(state.gene.list) ||
    !isArray(state.gene.edges) ||
    !state.gene.edges.length ||
    !isArray(state.gene.selected) ||
    !state.gene.selected.length
  )
    return { nodes: [], links: [], edges: state.gene.edges };

  console.time('construct graph');

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

  nodes = nodes.slice(0, 50);

  let links = state.gene.edges
    .map((edge) => ({
      ...edge,
      source: edge.gene1,
      target: edge.gene2
    }))
    .map((edge) => ({ ...edge, normalizedWeight: edge.weight }))
    .filter(
      (edge) =>
        nodes.find((node) => node.id === edge.gene1) &&
        nodes.find((node) => node.id === edge.gene2)
    );

  if (links.length) {
    const weights = links.map((link) => link.weight);
    const minWeight = Math.min(...weights);
    const maxWeight = Math.max(...weights);
    links = links.map((link) => ({
      ...link,
      normalizedWeight: (link.weight - minWeight) / (maxWeight - minWeight)
    }));
  }
  links.sort((a, b) => a.weight - b.weight);

  console.timeEnd('construct graph');

  return { nodes, links, edges: state.gene.edges };
};

Network = connect(mapStateToProps)(Network);

export default Network;
