import React from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { connect } from 'react-redux';

import FetchAlert from '../../../components/fetch-alert';
import { isArray } from '../../../util/types';
import { isString } from '../../../util/types';
import Filters from './filters';
import Graph from './graph';
import Controls from './controls';

import './index.css';

// genes network section

let Network = ({ list, selected, edges }) => {
  // internal state
  const [nodeCutoff, setNodeCutoff] = useState(20);
  const [edgeWeightCutoff, setEdgeWeightCutoff] = useState(0.4);

  // memoized full graph
  const fullGraph = useMemo(() => constructGraph({ list, selected, edges }), [
    list,
    selected,
    edges
  ]);

  // memoized filtered graph
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

// util func to lookup entry in array of objects by arbitrary keys
const lookup = (array, value, keys = ['id']) => {
  for (const key of keys) {
    const found = array.find((entry) => entry[key] === value);
    if (found)
      return found;
  }
  return undefined;
};

// take gene list, selected, and edges to produce nodes and links objects
// in format that d3 expects
export const constructGraph = ({ list, selected, edges }) => {
  // if we don't have all we need, exit
  if (
    !isArray(list) ||
    !list.length ||
    !isArray(edges) ||
    !edges.length ||
    !isArray(selected) ||
    !selected.length
  )
    return;

  // copy objects to make them extensible
  // (objects coming from immer state are frozen by default)
  list = list.map((gene) => ({ ...gene }));
  selected = selected.map((gene) => ({ ...gene }));
  edges = edges.map((edge) => ({ ...edge }));

  // init nodes and links
  let nodes = new Set();
  let links = edges;

  // build master list of node ids, without duplicates
  links.forEach((link) => nodes.add(link.gene1).add(link.gene2));
  selected.forEach((selected) => nodes.add(selected.id));
  nodes = [...nodes];

  // look up node ids in master gene list and replace with full gene props
  nodes = nodes.map((node) => lookup(list, node)).filter((node) => node);

  // mark each node as selected or not
  nodes.forEach((node) => {
    node.selected = lookup(selected, node.id) ? true : false;
  });

  // put source and target props on links, as expected by d3
  links = links.map((link) => ({
    ...link,
    source: link.gene1,
    target: link.gene2
  }));

  // don't include nodes that aren't connected to a selected node
  nodes = nodes.filter((node) => {
    for (const link of links) {
      if (node.selected)
        return true;
      if (link.gene1 === node.id && lookup(nodes, link.gene2).selected)
        return true;
      if (link.gene2 === node.id && lookup(nodes, link.gene1).selected)
        return true;
    }
    return false;
  });

  // calculate the relative "degree" of each node by summing the weights of
  // its edges
  nodes.forEach((node) => {
    // make selected nodes have max degree so they are never filtered out
    // by node # cutoff
    if (node.selected)
      node.degree = Infinity;
    else {
      const nodeLinks = links.filter(
        (link) => link.source === node.id || link.target === node.id
      );
      node.degree = nodeLinks
        .map((link) => link.weight)
        .reduce((sum, weight) => sum + weight, 0);
    }
  });

  // sort by degree
  nodes.sort((a, b) => b.degree - a.degree);

  return { nodes, links };
};

// filter full graph based on filter controls above graph display
export const filterGraph = ({ fullGraph, edgeWeightCutoff, nodeCutoff }) => {
  let nodes = fullGraph?.nodes;
  let links = fullGraph?.links;

  // if we don't have all we need, exit
  if (!isArray(nodes) || !isArray(links))
    return;

  // truncate list based on cutoff point
  // higher degree nodes will remain due to previous sorting by degree
  const selected = nodes.filter((node) => node.selected).length;
  nodes = nodes.slice(0, nodeCutoff + selected);

  // remove any links whose source or target node no longer exist
  links = links
    .filter((link) => lookup(nodes, link.gene1) && lookup(nodes, link.gene2))
    // remove links below weight cutoff
    .filter((link) => link.weight > edgeWeightCutoff);

  // sort links by weight to put higher weights on top of lower weights
  links.sort((a, b) => b.weight - a.weight);

  // calculate normalized weights, ie lowest in set --> 0 and highest --> 1
  if (links.length) {
    const weights = links.map((link) => link.weight);
    const maxWeight = Math.max(...weights);
    const minWeight = Math.min(...weights);
    links.forEach((link) => {
      link.normalizedWeight =
        (link.weight - minWeight) / (maxWeight - minWeight);
    });
  }

  // remove nodes that have no links and aren't selected
  nodes = nodes.filter(
    (node) => node.selected || lookup(links, node.id, ['gene1', 'gene2'])
  );

  // mark each item as a node or a link (for convenience later)
  nodes.forEach((node) => (node.node = true));
  links.forEach((link) => (link.link = true));

  return { nodes, links };
};

const mapStateToProps = (state) => ({
  list: state.genes.list,
  selected: state.genes.selected,
  edges: state.genes.edges
});

Network = connect(mapStateToProps)(Network);

export default Network;
