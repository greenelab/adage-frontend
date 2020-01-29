import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import FetchAlert from '../../../components/fetch-alert';
import { mapGene } from '../';
import { isArray } from '../../../util/types.js';
import { isString } from '../../../util/types.js';
import { transferProps } from '../../../util/object.js';
import { xor } from '../../../util/math.js';
import Filters from './filters';
import Graph from './graph';
import Controls from './controls';

import './index.css';

let oldGraph;

let Network = ({ list, selected, edges }) => {
  const [maxNodes, setMaxNodes] = useState(50);
  const [minEdgeWeight, setMinEdgeWeight] = useState(0.4);
  const [graph, setGraph] = useState();

  useEffect(() => {
    console.time('construct graph');

    const newGraph = constructGraph({
      list,
      selected,
      edges,
      minEdgeWeight,
      maxNodes
    });
    if (oldGraph?.nodes && newGraph?.nodes) {
      newGraph.nodes = transferProps(oldGraph.nodes, newGraph.nodes, 'id', [
        'x',
        'y',
        'fx',
        'fy',
        'vx',
        'vy'
      ]);
    }
    if (newGraph)
      setGraph(newGraph);
    oldGraph = newGraph;

    console.timeEnd('construct graph');
  }, [list, selected, edges, minEdgeWeight, maxNodes]);

  return (
    <>
      {isString(edges) && <FetchAlert status={edges} subject='edges' />}
      <Filters
        nodeCount={graph?.nodes?.length}
        linkCount={graph?.links?.length}
        nodeTotal={graph?.nodeTotal}
        linkTotal={graph?.linkTotal}
        maxNodes={maxNodes}
        setMaxNodes={setMaxNodes}
        minEdgeWeight={minEdgeWeight}
        setMinEdgeWeight={setMinEdgeWeight}
      />
      {graph && (
        <>
          <Graph nodes={graph.nodes} links={graph.links} />
          <Controls nodes={graph.nodes} links={graph.links} />
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

  let links = edges;
  let nodes = new Set();

  links.forEach((link) => nodes.add(link.gene1).add(link.gene2));
  selected.forEach((selected) => nodes.add(selected.id));
  nodes = [...nodes];

  const selectedLinks = links.filter((link) =>
    xor(
      selected.find((selected) => link.gene1 === selected.id),
      selected.find((selected) => link.gene2 === selected.id)
    )
  );

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
      degree: selectedLinks
        .filter((link) => link.gene1 === node.id || link.gene2 === node.id)
        .map((link) => link.weight)
        .reduce((sum, weight) => sum + weight, 0)
    }));
  const nodeTotal = nodes.length;
  nodes = nodes.sort((a, b) => b.degree - a.degree).slice(0, maxNodes);

  links = links
    .map((link) => ({
      ...link,
      source: link.gene1,
      target: link.gene2
    }))
    .map((link) => ({ ...link, normalizedWeight: link.weight }));
  const linkTotal = links.length;
  links = links
    .filter(
      (link) =>
        nodes.find((node) => node.id === link.gene1) &&
        nodes.find((node) => node.id === link.gene2)
    )
    .filter((link) => link.weight >= minEdgeWeight)
    .sort((a, b) => a.weight - b.weight)
    .map((link, index, array) => ({
      ...link,
      normalizedWeight:
        (link.weight - array[0].weight) /
        (array[array.length - 1].weight - array[0].weight)
    }));

  nodes = nodes.filter(
    (node) =>
      node.selected ||
      links.find((link) => link.gene1 === node.id || link.gene2 === node.id)
  );

  return { nodes, links, nodeTotal, linkTotal };
};

const mapStateToProps = (state) => ({
  list: state.gene.list,
  selected: state.gene.selected,
  edges: state.gene.edges
});

Network = connect(mapStateToProps)(Network);

export default Network;
