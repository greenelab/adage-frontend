import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import FetchAlert from '../../../components/fetch-alert';
import { mapGene } from '../';
import { isArray } from '../../../util/types.js';
import { isString } from '../../../util/types.js';
import { transferProps } from '../../../util/object';
import Graph from './graph';
import Controls from './controls';

import './index.css';

let Network = ({ list, selected, edges }) => {
  const [minEdgeWeight, setMinEdgeWeight] = useState(0.9);
  const [maxNodes, setMaxNodes] = useState(20);
  const [graph, setGraph] = useState();

  useEffect(() => {
    const newGraph = constructGraph({
      list,
      selected,
      edges,
      minEdgeWeight,
      maxNodes
    });
    if (newGraph && newGraph?.nodes && graph?.nodes) {
      newGraph.nodes = transferProps(graph.nodes, newGraph.nodes, 'id', [
        'x',
        'y',
        'fx',
        'fy',
        'vx',
        'vy'
      ]);
    }
    setGraph(newGraph);
  }, [list, selected, edges, minEdgeWeight, maxNodes]);

  return (
    <>
      {isString(edges) && <FetchAlert status={edges} subject='edges' />}
      {graph && (
        <>
          <Graph nodes={graph.nodes} links={graph.links} />
          <Controls
            nodes={graph.nodes}
            links={graph.links}
            minEdgeWeight={minEdgeWeight}
            setMinEdgeWeight={setMinEdgeWeight}
            maxNodes={maxNodes}
            setMaxNodes={setMaxNodes}
          />
        </>
      )}
    </>
  );
};

const constructGraph = ({ list, selected, edges, minEdgeWeight, maxNodes }) => {
  if (
    !isArray(list) ||
    !isArray(edges) ||
    !edges.length ||
    !isArray(selected) ||
    !selected.length
  )
    return;

  console.time('construct graph');

  let links = edges;
  let nodes = new Set();

  links.forEach((link) => nodes.add(link.gene1).add(link.gene2));
  selected.forEach((selected) => nodes.add(selected.id));
  nodes = [...nodes];

  nodes = nodes
    .map((node) => list.find((gene) => gene.id === node))
    .filter((node) => node)
    .map(mapGene)
    .map((node) => ({
      ...node,
      selected:
        selected.find((selected) => selected.id === node.id) !== undefined
    }))
    .map((node) => ({
      ...node,
      degree: node.selected ?
        1 :
        links
          .filter((link) => link.gene1 === node.id || link.gene2 === node.id)
          .map((link) => link.weight)
          .reduce(
            (sum, weight, index, array) =>
              sum + Math.abs(weight) / array.length,
            0
          ) || 0
    }))
    .sort((a, b) => b.degree - a.degree)
    .slice(0, maxNodes);

  links = links
    .map((link) => ({
      ...link,
      source: link.gene1,
      target: link.gene2
    }))
    .map((link) => ({ ...link, normalizedWeight: link.weight }))
    .filter(
      (link) =>
        nodes.find((node) => node.id === link.gene1) &&
        nodes.find((node) => node.id === link.gene2)
    )
    .filter((link) => link.weight >= minEdgeWeight);

  if (links.length) {
    const weights = links.map((link) => link.weight);
    const minWeight = Math.min(...weights);
    const maxWeight = Math.max(...weights);
    links = links.map((link) => ({
      ...link,
      normalizedWeight: (link.weight - minWeight) / (maxWeight - minWeight)
    }));
  }

  console.timeEnd('construct graph');

  return { nodes, links };
};

const mapStateToProps = (state) => ({
  list: state.gene.list,
  selected: state.gene.selected,
  edges: state.gene.edges
});

Network = connect(mapStateToProps)(Network);

export default Network;
