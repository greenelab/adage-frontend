import React from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { connect } from 'react-redux';

import FetchAlert from '../../../components/fetch-alert';
import { mapGene } from '../';
import { isArray } from '../../../util/types.js';
import { isString } from '../../../util/types.js';
import { xor } from '../../../util/math.js';
import Filters from './filters';
import Graph from './graph';
import Controls from './controls';

import './index.css';

let Network = ({ list, selected, edges }) => {
  const [nodeCutoff, setNodeCutoff] = useState(50);
  const [edgeWeightCutoff, setEdgeWeightCutoff] = useState(0.4);

  const fullGraph = useMemo(() => constructGraph({ list, selected, edges }), [
    list,
    selected,
    edges
  ]);

  const filteredGraph = useMemo(
    () => filterGraph({ fullGraph, nodeCutoff, edgeWeightCutoff }),
    [fullGraph, nodeCutoff, edgeWeightCutoff]
  );

  return (
    <>
      {isString(edges) && <FetchAlert status={edges} subject='edges' />}

      {filteredGraph && (
        <>
          <Filters
            selectedNodes={selected?.length}
            filteredNodes={filteredGraph?.nodes?.length}
            filteredLinks={filteredGraph?.links?.length}
            fullNodes={fullGraph?.nodes?.length}
            fullLinks={fullGraph?.links?.length}
            nodeCutoff={nodeCutoff}
            setNodeCutoff={setNodeCutoff}
            edgeWeightCutoff={edgeWeightCutoff}
            setEdgeWeightCutoff={setEdgeWeightCutoff}
          />
          <Graph nodes={filteredGraph.nodes} links={filteredGraph.links} />
          <Controls nodes={filteredGraph.nodes} links={filteredGraph.links} />
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
    }))
    .sort((a, b) => b.degree - a.degree);

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
    .filter((link) => link.weight >= edgeWeightCutoff)
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

  return { nodes, links };
};

const mapStateToProps = (state) => ({
  list: state.gene.list,
  selected: state.gene.selected,
  edges: state.gene.edges
});

Network = connect(mapStateToProps)(Network);

export default Network;
