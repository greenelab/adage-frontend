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

// util func to lookup value in array by arbitrary keys
const lookup = (value, array, keys = ['id']) => {
  for (const key of keys) {
    const found = array.find((entry) => entry[key] === value);
    if (found)
      return found;
  }
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
  const links = edges.map((edge) => ({ ...edge }));

  // build master list of node ids, without duplicates
  let nodeIds = new Set();
  links.forEach((link) => nodeIds.add(link.gene1).add(link.gene2));
  selected.forEach((selected) => nodeIds.add(selected.id));
  nodeIds = [...nodeIds];

  // look up node ids in master gene list and replace with full gene props
  const nodes = nodeIds.map((id) => lookup(id, list)).filter((node) => node);

  // mark each node as selected or not
  nodes.forEach((node) => {
    node.selected = lookup(node.id, selected) ? true : false;
  });

  // put source and target props on links, as expected by d3
  links.forEach((link) => {
    link.source = link.gene1;
    link.target = link.gene2;
  });

  // mark each link as selected or not
  links.forEach((link) => {
    link.selected =
      lookup(link.gene1, selected) || lookup(link.gene2, selected);
  });
  const selectedLinks = links.filter((link) => link.selected);

  // calculate the relative "degree" of each node by averaging the weights of
  // all its edges that are connected to a selected node
  nodes.forEach((node) => {
    // give selected nodes max degree so they are always shown
    if (node.selected)
      node.degree = Infinity;
    else {
      // of links connected to selected node
      const weights = selectedLinks
        // get links also connected to this node
        .filter((link) => link.gene1 === node.id || link.gene2 === node.id)
        // get weights of links
        .map((link) => link.weight);
      // average weights
      const sum = weights.reduce((sum, weight) => sum + weight, 0);
      const count = weights.length;
      node.degree = sum / count;
    }
  });

  // sort nodes by degree
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

  // sort links by weight to put higher weights on top of lower weights
  links.sort((a, b) => b.weight - a.weight);

  // truncate node list based on node cutoff
  // higher degree nodes will remain due to previous sorting by degree
  nodes = nodes.slice(0, nodeCutoff);

  // filter links below weight cutoff
  links = links.filter((link) => link.weight >= edgeWeightCutoff);

  // remove any links whose source or target node no longer exist
  links = links.filter(
    (link) => lookup(link.gene1, nodes) && lookup(link.gene2, nodes)
  );

  // remove any nodes without links, except for selected nodes
  nodes = nodes.filter(
    (node) =>
      node.selected ||
      links.find((link) => link.gene1 === node.id || link.gene2 === node.id)
  );

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
