import hcluster from 'hclusterjs';

export const clusterData = (data, idKey, valueKey) => {
  // transform
  // [ { id, value }, { id, value }, ... ]
  // to
  // [ { uniqueId, values: [ value, value, ... ] }, ... ]
  let newData = {};
  for (const d of data) {
    const id = d[idKey];
    const value = d[valueKey];
    if (!newData[id])
      newData[id] = { [idKey]: id, [valueKey]: [] };
    newData[id][valueKey].push(value);
  }
  newData = [...Object.values(newData)];

  // cluster data using hcluster library
  newData = hcluster()
    .distance('euclidean')
    .linkage('avg')
    .posKey(valueKey)
    .data(newData);

  // give back clustered (sorted) list of ids
  return newData.orderedNodes().map((d) => d[idKey]);
};
