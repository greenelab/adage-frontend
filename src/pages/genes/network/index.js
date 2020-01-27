import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import FetchAlert from '../../../components/fetch-alert';
import { mapGene } from '../';
import { isArray } from '../../../util/types.js';
import { isString } from '../../../util/types.js';
import Graph from './graph';
import Controls from './controls';

import './index.css';

let Network = ({ list, selected, edges }) => {
  const [minEdgeWeight, setMinEdgeWeight] = useState(0.9);
  const [graph, setGraph] = useState();

  useEffect(() => {
    setGraph(constructGraph({ list, selected, edges, minEdgeWeight }));
  }, [list, selected, edges, minEdgeWeight]);

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

  edges = edges.filter((edge) => edge.weight >= minEdgeWeight);

  let nodes = new Set();
  edges.forEach((edge) => nodes.add(edge.gene1).add(edge.gene2));
  selected.forEach((selected) => nodes.add(selected.id));

  nodes = [...nodes]
    .map((node) => list.find((gene) => gene.id === node))
    .filter((node) => node)
    .map(mapGene)
    .map((node) => ({
      ...node,
      selected:
        selected.find((selected) => selected.id === node.id) !== undefined
    }));

  let links = edges
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

  return { nodes, links };
};

const mapStateToProps = (state) => ({
  list: state.gene.list,
  selected: state.gene.selected,
  edges: state.gene.edges
});

Network = connect(mapStateToProps)(Network);

export default Network;
