import React from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { connect } from 'react-redux';

import FetchAlert from '../../../components/fetch-alert';
import { mapGene } from '../';
import { isArray } from '../../../util/types';
import { isString } from '../../../util/types';
import { xor } from '../../../util/math';
import { clean } from '../../../util/object';
import Filters from './filters';
import Graph from './graph';
import Controls from './controls';

import './index.css';

let Network = ({ list, selected, edges }) => {
  const [nodeCutoff, setNodeCutoff] = useState(20);
  const [edgeWeightCutoff, setEdgeWeightCutoff] = useState(0.4);

  const fullGraph = useMemo(() => constructGraph({ list, selected, edges }), [
    list,
    selected,
    edges
  ]);

  const graph = useMemo(
    () => filterGraph({ fullGraph, nodeCutoff, edgeWeightCutoff }),
    [fullGraph, nodeCutoff, edgeWeightCutoff]
  );

  return (
    <>
      {isString(edges) && <FetchAlert status={edges} subject='edges' />}
      {graph && (
        <>
          <Filters
            selectedNodes={selected?.length}
            filteredNodes={graph?.nodes?.length}
            filteredLinks={graph?.links?.length}
            fullNodes={fullGraph?.nodes?.length}
            fullLinks={fullGraph?.links?.length}
            nodeCutoff={nodeCutoff}
            setNodeCutoff={setNodeCutoff}
            edgeWeightCutoff={edgeWeightCutoff}
            setEdgeWeightCutoff={setEdgeWeightCutoff}
          />
          <Graph nodes={graph.nodes} links={graph.links} />
          <Controls nodes={graph.nodes} links={graph.links} />
        </>
      )}
    </>
  );
};

const constructGraph = ({ list, selected, edges }) => {
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
    .map(mapGene);

  nodes.forEach((node) => {
    node.selected = selected.find((selected) => selected.id === node.id);
  });

  nodes.forEach((node) => {
    node.degree = selectedLinks
      .filter((link) => link.gene1 === node.id || link.gene2 === node.id)
      .map((link) => link.weight)
      .reduce((sum, weight) => sum + weight, 0);
  });

  nodes.sort((a, b) => b.degree - a.degree);

  links = links.map((link) => ({
    ...link,
    source: link.gene1,
    target: link.gene2
  }));

  return { nodes, links };
};

const filterGraph = ({ fullGraph, edgeWeightCutoff, nodeCutoff }) => {
  let nodes = fullGraph?.nodes;
  let links = fullGraph?.links;

  if (!isArray(nodes) || !isArray(links))
    return;

  nodes = nodes.slice(0, nodeCutoff);

  links = links
    .filter(
      (link) =>
        nodes.find((node) => node.id === link.gene1) &&
        nodes.find((node) => node.id === link.gene2)
    )
    .filter((link) => link.weight >= edgeWeightCutoff);

  links.sort((a, b) => b.weight - a.weight);

  if (links.length) {
    const weights = links.map((link) => link.weight);
    const maxWeight = Math.max(...weights);
    const minWeight = Math.min(...weights);
    links.forEach((link) => {
      link.normalizedWeight =
        (link.weight - minWeight) / (maxWeight - minWeight);
    });
  }

  nodes = nodes.filter(
    (node) =>
      node.selected ||
      links.find((link) => link.gene1 === node.id || link.gene2 === node.id)
  );

  nodes.forEach((node) => (node.node = true));
  links.forEach((link) => (link.link = true));

  return { nodes, links };
};

const mapStateToProps = (state) => ({
  list: isArray(state.gene.list) ?
    state.gene.list.map((gene) => clean(gene)) :
    [],
  selected: isArray(state.gene.selected) ?
    state.gene.selected.map((gene) => clean(gene)) :
    [],
  edges: isArray(state.gene.edges) ?
    state.gene.edges.map((gene) => clean(gene)) :
    []
});

Network = connect(mapStateToProps)(Network);

export default Network;
