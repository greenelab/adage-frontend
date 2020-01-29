import React from 'react';

import './index.css';

const Filters = ({
  nodeCount,
  linkCount,
  nodeTotal,
  linkTotal,
  maxNodes,
  setMaxNodes,
  minEdgeWeight,
  setMinEdgeWeight
}) => (
  <>
    {nodeCount} of {nodeTotal} nodes
    <br />
    {linkCount} of {linkTotal} links
    <br />
    Max Nodes: {maxNodes}
    <input
      type='range'
      min='0'
      max='100'
      step='1'
      value={maxNodes}
      onChange={(event) => setMaxNodes(Number(event.target.value))}
    />
    <br />
    Min Edge Weight: {minEdgeWeight}
    <input
      type='range'
      min='0.4'
      max='1.0'
      step='0.01'
      value={minEdgeWeight}
      onChange={(event) => setMinEdgeWeight(Number(event.target.value))}
    />
    <br />
  </>
);

export default Filters;
