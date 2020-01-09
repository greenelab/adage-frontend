import { fdr } from 'multtest';

// reference
// https://bitbucket.org/cgreene/integrator/src/1194f7ae1b11057a4649114e1f55570542acbcde/integrator/static/js/imp.js?

// k - number of successes in sample
// n - number of items in sample
export const binomialLog = (n, k) => {
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
export const hyperGeometricTest = (k, K, n, N) => {
  let sum = 0;
  for (let i = 0; i < k; i++) {
    sum += Math.exp(
      binomialLog(K, i) + binomialLog(N - K, n - i) - binomialLog(N, n)
    );
  }
  return sum;
};

export const mean = (array) =>
  array.reduce((sum, value) => sum + value, 0) / (array.length || 1);

export const calculateEnrichedSignatures = ({
  selectedGenes,
  participations,
  geneCount,
  signatures
}) => {
  let enrichedSignatures = signatures
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
    .filter((signatures) => signatures.participatingGenes.length)
    // compute p value of enriched signature
    .map((signature) => {
      const N = geneCount;
      const K = selectedGenes.length;
      const n = signature.participatingGenes.length;
      const k = signature.matchedGenes.length;
      const pValue = 1 - hyperGeometricTest(k, K, n, N);

      return { ...signature, pValue };
    });

  // extract p values from enriched signatures into array
  const pValues = enrichedSignatures.map((signature) => signature.pValue);
  // correct p values using false discovery rate function from multtest
  const correctedPValues = fdr(pValues);
  // put corrected p values back into enriched signatures
  enrichedSignatures = enrichedSignatures.map((enrichedSignature, index) => ({
    ...enrichedSignature,
    pValue: correctedPValues[index].toFixed(5)
  }));

  enrichedSignatures.sort((a, b) => a.pValue - b.pValue);

  return enrichedSignatures;
};
