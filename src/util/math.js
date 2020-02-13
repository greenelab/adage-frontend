import { fdr } from 'multtest';
import { isArray } from './types';

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

// calculate enriched signatures
// adapted from https://github.com/greenelab/adage-server/blob/master/interface/src/app/gene/enriched_signatures.js
export const calculateEnrichedSignatures = ({
  selectedGenes,
  participations,
  geneList,
  signatureList
}) => {
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
  // correct p values using false discovery rate function from multtest
  const correctedPValues = fdr(pValues);
  // put corrected p values back into enriched signatures
  enrichedSignatures = enrichedSignatures.map((enrichedSignature, index) => ({
    ...enrichedSignature,
    pValue: correctedPValues[index].toFixed(5)
  }));

  return enrichedSignatures;
};

// basic and/or evaluation
export const xor = (a, b) => Boolean(a) ^ Boolean(b);
