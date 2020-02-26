// https://stdlib.io/docs/api/v0.0.90/@stdlib/stats/iter/mean
import array2iterator from '@stdlib/array/to-iterator';

// https://stdlib.io/docs/api/v0.0.90/@stdlib/stats/iter/mean
import itermean from '@stdlib/stats/iter/mean';

// https://stdlib.io/docs/api/v0.0.90/@stdlib/stats/base/dists/hypergeometric/cdf
import cdf from '@stdlib/stats/base/dists/hypergeometric/cdf';

// https://stdlib.io/docs/api/v0.0.90/@stdlib/stats/ttest2
import ttest2 from '@stdlib/stats/ttest2';

// https://github.com/cmpolis/hcluster.js
import hcluster from 'hclusterjs';

// https://github.com/Planeshifter/multtest
import { fdr } from 'multtest';

import { isArray } from './types';

// get mean/average of array
export const mean = (array) => itermean(array2iterator(array));

// reference
// https://en.wikipedia.org/wiki/Hypergeometric_distribution
// k - number of successes in sample
// K - number of successes in population
// n - number of items in sample
// N - number of items in population

// see https://stattrek.com/online-calculator/hypergeometric.aspx
// the stdlib cdf function calculates P(X <= k), but what we really want is 
// P(X >= k). therefore, provide k-1 as X instead of k to get P(X < k), then
// subtract the result from 1 to get P(X >= k)
// therefore, provide k-1 as X instead of k
export const hyperGeometricTest = (k, K, n, N) => 1 - cdf(k - 1, N, K, n);
// compare to the equivalent test in R, the fisher test:
// k <- 1; K <- 5; n <- 10; N <- 50; mat <- matrix(c(k, K-k, n-k, N-K-n+k), nrow=2, ncol=2); print(fisher.test(mat, alternative="greater")$p.value, digits = 20);

// perform two-sample, unpaired, welch's (student's) t-test and return p value
export const ttest = (array1, array2) => ttest2(array1, array2).pValue;

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
      const selectedParticipatingGenes = participatingGenes
        .filter((gene) =>
          selectedGenes.find((selected) => selected.id === gene)
        )
        // replace matched gene id with full gene info from selected genes
        .map((gene) => selectedGenes.find((selected) => selected.id === gene));

      // add participating and matched genes to signature
      return { ...signature, participatingGenes, selectedParticipatingGenes };
    })
    // remove signatures with no participating genes
    .filter((signature) => signature.participatingGenes.length)
    // compute p value of enriched signature
    .map((signature) => {
      // # of all genes in the model
      const N = geneList.length;
      // # of genes the user has selected
      const K = selectedGenes.length;
      // # of genes participating in the signature
      const n = signature.participatingGenes.length;
      // # of selected genes participating in the signature
      const k = signature.selectedParticipatingGenes.length;
      const pValue = hyperGeometricTest(k, K, n, N);

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
