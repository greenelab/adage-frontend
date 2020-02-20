import jStat from 'jstat';
import hcluster from 'hclusterjs';
import { fdr } from 'multtest';
import { isArray } from './types';
import { isNumber } from './types';

// get mean/average of array
const mean = (array) => {
  let count = 0;
  let total = 0;

  for (const element of array) {
    if (isNumber(element)) {
      count++;
      total += element;
    }
  }

  if (count > 0)
    return total / count;
  else
    return 0;
};

// reference
// https://bitbucket.org/cgreene/integrator/src/1194f7ae1b11057a4649114e1f55570542acbcde/integrator/static/js/imp.js?

// k - number of successes in sample
// n - number of items in sample
const binomialLog = (n, k) => {
  let coefficient = 0;
  for (let i = n - k + 1; i <= n; i++)
    coefficient += Math.log(i);
  for (let i = 1; i <= k; i++)
    coefficient -= Math.log(i);
  return coefficient;
};

// reference
// https://en.wikipedia.org/wiki/Hypergeometric_distribution

// k - number of successes in sample
// K - number of successes in population
// n - number of items in sample
// N - number of items in population
const hyperGeometricTest = (k, K, n, N) => {
  let sum = 0;
  for (let i = 0; i < k; i++) {
    sum += Math.exp(
      binomialLog(K, i) + binomialLog(N - K, n - i) - binomialLog(N, n)
    );
  }
  return sum;
};

// calculate enriched signatures
// adapted from https://github.com/greenelab/adage-server/blob/master/interface/src/app/gene/enriched_signatures.js
export const calculateEnrichedSignatures = ({
  selectedGenes,
  participations,
  geneList,
  signatureList
}) => {
  // if we dont have all we need, exit
  if (
    !isArray(selectedGenes) ||
    !selectedGenes.length ||
    !isArray(participations) ||
    !participations.length ||
    !isArray(geneList) ||
    !geneList.length ||
    !isArray(signatureList) ||
    !signatureList.length
  )
    return [];

  let enrichedSignatures = signatureList
    // for each signature
    .map((signature) => {
      const participatingGenes = participations
        // get participations that include this signature
        .filter((participation) => participation.signature === signature.id)
        // get gene of each of those participations
        .map((participation) => participation.gene);

      // of participating genes, get selected ones
      const matchedGenes = participatingGenes
        .filter((gene) =>
          selectedGenes.find((selected) => selected.id === gene)
        )
        // replace matched gene id with full gene info from selected genes
        .map((gene) => selectedGenes.find((selected) => selected.id === gene));

      // add participating and matched genes to signature
      return { ...signature, participatingGenes, matchedGenes };
    })
    // remove signatures with no participating genes
    .filter((signature) => signature.participatingGenes.length)
    // compute p value of enriched signature
    .map((signature) => {
      const N = geneList.length;
      const K = selectedGenes.length;
      const n = signature.participatingGenes.length;
      const k = signature.matchedGenes.length;
      const pValue = 1 - hyperGeometricTest(k, K, n, N);

      return { ...signature, pValue };
    });

  // extract p values from enriched signatures into array
  const pValues = enrichedSignatures.map((signature) => signature.pValue);
  // correct p values using false discovery rate function from multtest library
  const correctedPValues = fdr(pValues);
  // put corrected p values back into enriched signatures
  enrichedSignatures = enrichedSignatures.map((enrichedSignature, index) => ({
    ...enrichedSignature,
    // round decimal point
    pValue: correctedPValues[index]
  }));

  return enrichedSignatures;
};

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

// calculate data for volcano plot
// adapted from https://github.com/greenelab/adage-server/blob/master/interface/src/app/analyze/analysis/sampleBin.js
export const calculateVolcanoSignatures = ({
  signatureList,
  activities,
  diamondGroup,
  spadeGroup
}) => {
  // if we dont have all we need, exit
  if (
    !isArray(signatureList) ||
    !signatureList.length ||
    !isArray(activities) ||
    !activities.length ||
    !isArray(diamondGroup) ||
    diamondGroup.length < 2 ||
    !isArray(spadeGroup) ||
    spadeGroup.length < 2
  )
    return [];

  // take signature id and sample id, and find value of associated activity
  const getActivity = (signatureId, sampleId) =>
    (
      activities.find(
        (activity) =>
          activity.signature === signatureId && activity.sample === sampleId
      ) || {}
    ).value;

  // remove any signatures that are not part of activities
  signatureList = signatureList.filter((signature) =>
    activities.find((activity) => activity.signature === signature.id)
  );

  // for each signature
  let volcanoSignatures = signatureList.map((signature) => {
    // get associated activity for each diamond sample
    const diamondActivities = diamondGroup
      .map((sampleId) => getActivity(signature.id, sampleId))
      .filter((activity) => activity);
    // get associated activity for each spade sample
    const spadeActivities = spadeGroup
      .map((sampleId) => getActivity(signature.id, sampleId))
      .filter((activity) => activity);

    // compute difference between diamond and spade activity means
    const meanDiff = mean(diamondActivities) - mean(spadeActivities);
    // compute p value of signature based using t test from ttest library
    const pValue = ttest(diamondActivities, spadeActivities);

    return {
      ...signature,
      diamondActivities,
      spadeActivities,
      meanDiff,
      pValue
    };
  });

  // extract p values from volcano signatures into array
  const pValues = volcanoSignatures.map((signature) => signature.pValue);
  // correct p values using false discovery rate function from multtest library
  const correctedPValues = fdr(pValues);
  // put corrected p values back into volcano signatures
  volcanoSignatures = volcanoSignatures.map((volcanoSignature, index) => ({
    ...volcanoSignature,
    // negative log 10 transform and round decimal point
    pValue: -Math.log10(correctedPValues[index])
  }));

  return volcanoSignatures;
};

// perform two-sample, unpaired, welch's (student's) t-test and return p value
// from https://github.com/jstat/jstat/issues/189#issuecomment-469255296
// note: cannot use the 'ttest' library because downstream dependency is
// written in web assembly and cannot be compiled by 'workerize-loader' yet
const ttest = (array1, array2) => {
  const n1 = array1.length; // array 1 length
  const n2 = array2.length; // array 2 length
  const n12 = Math.pow(n1, 2); // raised array 1 length
  const n22 = Math.pow(n2, 2); // raised array 2 length
  const meanA = jStat.mean(array1); // mean of array 1
  const meanB = jStat.mean(array2); // mean of array 2
  // raised stdev of array 1
  const stdevA2 = Math.pow(jStat.stdev(array1, true), 2);
  // raised stdev of array 2
  const stdevB2 = Math.pow(jStat.stdev(array2, true), 2);
  // raised by 4 stdev of array 1
  const stdevA4 = Math.pow(jStat.stdev(array1, true), 4);
  // raised by 4 stdev of array 2
  const stdevB4 = Math.pow(jStat.stdev(array2, true), 4);
  const t = (meanA - meanB) / Math.sqrt(stdevA2 / n1 + stdevB2 / n2);
  const dfUpper = Math.pow(stdevA2 / n1 + stdevB2 / n2, 2);
  const dfLower = stdevA4 / (n12 * (n1 - 1)) + stdevB4 / (n22 * (n2 - 1));
  const df = Math.round(dfUpper / dfLower);
  const pValue = jStat.studentt.cdf(-Math.abs(t), df) * 2;
  return pValue;
};
