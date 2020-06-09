import { constructGraph } from './';
import { filterGraph } from './';

import list from '../../../dummy-data/gene-list.json';
import edges from '../../../dummy-data/gene-edges.json';

import expectedNodes from '../../../dummy-data/gene-network-nodes.json';
import expectedLinks from '../../../dummy-data/gene-network-links.json';

// test selection of genes: cat and sigX
const selected = [{ id: 953 }, { id: 801 }];

// test gene and edge cutoffs
const edgeWeightCutoff = 0.6;
const nodeCutoff = 65;

test('construct and filter graph', () => {
  const fullGraph = constructGraph({ list, selected, edges });
  const filteredGraph = filterGraph({
    fullGraph,
    edgeWeightCutoff,
    nodeCutoff
  });

  let { nodes, links } = filteredGraph;

  // strip out unnecessary fields
  nodes = nodes.map(({ id, standardName, systematicName, degree }) => ({
    id,
    standardName,
    systematicName,
    degree
  }));
  links = links.map(({ id, weight, source, target }) => ({
    source,
    target
  }));

  expect(nodes).toStrictEqual(expectedNodes);
  expect(links).toStrictEqual(expectedLinks);
});
