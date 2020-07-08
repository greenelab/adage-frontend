// https://stdlib.io/docs/api/v0.0.90/@stdlib/stats/iter/mean
import array2iterator from '@stdlib/array/to-iterator';

// https://stdlib.io/docs/api/v0.0.90/@stdlib/stats/iter/mean
import itermean from '@stdlib/stats/iter/mean';

// https://stdlib.io/docs/api/v0.0.90/@stdlib/stats/base/dists/hypergeometric/cdf
import cdf from '@stdlib/stats/base/dists/hypergeometric/cdf';

// https://stdlib.io/docs/api/v0.0.90/@stdlib/stats/ttest2
import ttest2 from '@stdlib/stats/ttest2';

// https://github.com/greenelab/hclust
import { clusterData as hclust } from '@greenelab/hclust';

// https://github.com/Planeshifter/multtest
import { fdr } from 'multtest';

import { isArray } from './types';
import { isObject } from './types';

// normalize an array of values to a % between min and max
export const normalize = (values = [], min = 0, max = 1) =>
  values.map((value) => (value - min) / (max - min));

// get mean/average of array
export const mean = (array) => itermean(array2iterator(array));

// reference
// https://en.wikipedia.org/wiki/Hypergeometric_distribution

// see https://stattrek.com/online-calculator/hypergeometric.aspx
// the stdlib cdf function calculates P(X <= k), but what we really want is
// P(X >= k). therefore, provide k-1 as X instead of k to get P(X < k), then
// subtract the result from 1 to get P(X >= k)

// k - number of successes in sample
// K - number of successes in population
// n - number of items in sample
// N - number of items in population
// subtract the result from 1 to get P(X >= k)
export const hyperGeometricTest = (k, K, n, N) => 1 - cdf(k - 1, N, K, n);

// compare to the equivalent test in R, the fisher test:
// k <- 1; K <- 5; n <- 10; N <- 50; mat <- matrix(c(k, K-k, n-k, N-K-n+k), nrow=2, ncol=2); print(fisher.test(mat, alternative="greater")$p.value, digits = 20);

// perform two-sample, unpaired, welch's (student's) t-test and return p value
export const ttest = (array1, array2) => ttest2(array1, array2).pValue;

// calculate enriched signatures
// adapted from https://github.com/greenelab/adage-server/blob/master/interface/src/app/gene/enriched_signatures.js
export const calculateEnrichedSignatures = ({
  selectedGenes,
  geneParticipations,
  geneList,
  signatureList
}) => {
  // if we don't have all we need, exit
  if (
    !isArray(selectedGenes) ||
    !selectedGenes.length ||
    !isArray(geneParticipations) ||
    !geneParticipations.length ||
    !isArray(geneList) ||
    !geneList.length ||
    !isArray(signatureList) ||
    !signatureList.length
  )
    return [];

  let enrichedSignatures = signatureList
    // for each signature
    .map((signature) => {
      const participatingGenes = geneParticipations
        // get participations that include this signature
        .filter((participation) => participation.signature === signature.id)
        // get gene id and weight of each of those participations
        .map((participation) => ({
          gene: participation.gene,
          weight: participation.weight
        }));

      // of participating genes, get selected ones
      const selectedParticipatingGenes = participatingGenes
        .filter(({ gene }) =>
          selectedGenes.find((selected) => selected.id === gene))
        // replace matched gene id with full gene info from selected genes
        .map(({ gene, weight }) => ({
          ...selectedGenes.find((selected) => selected.id === gene),
          weight
        }));

      // add participating and matched genes to signature
      return { ...signature, participatingGenes, selectedParticipatingGenes };
    })
    // remove signatures with no participating genes
    .filter(
      (signature) =>
        signature.participatingGenes.length &&
        signature.selectedParticipatingGenes.length
    )
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
    pValue: correctedPValues[index]
  }));

  return enrichedSignatures;
};

// cluster table of activities using hclust library
export const clusterActivities = ({ activities, prop }) => {
  // transform
  // [ { sample, value }, { sample, value }, ... ]
  // to
  // [ { sample, values: [ value, value, ... ] }, ... ]
  let data = {};
  for (const d of activities) {
    const id = d[prop].id;
    const value = d.value;
    if (!data[id])
      data[id] = { id, values: [] };
    data[id].values.push(value);
  }
  data = [...Object.values(data)];

  // cluster data using hclust library and give back ordered list of ids
  return hclust({ data, key: 'values' }).order.map((index) => data[index].id);
};

// calculate data for volcano plot
// adapted from https://github.com/greenelab/adage-server/blob/master/interface/src/app/analyze/analysis/sampleBin.js
export const calculateVolcanoSignatures = ({
  signatureList,
  activities,
  diamondGroup,
  spadeGroup
}) => {
  // if we don't have all we need, exit
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

  // take sample id and signature id, and find value of associated activity
  const getActivity = (sampleId, signatureId) => {
    const found = activities.find(
      (activity) =>
        activity.sample === sampleId && activity.signature === signatureId
    );
    return found?.value;
  };

  // remove any signatures that are not part of activities
  signatureList = signatureList.filter((signature) =>
    activities.find((activity) => activity.signature === signature.id));

  // for each signature
  let volcanoSignatures = signatureList.map((signature) => {
    // get associated activity for each diamond sample
    const diamondActivities = diamondGroup
      .map((sampleId) => getActivity(sampleId, signature.id))
      .filter((activity) => activity);
    // get associated activity for each spade sample
    const spadeActivities = spadeGroup
      .map((sampleId) => getActivity(sampleId, signature.id))
      .filter((activity) => activity);

    // if either group has less than 2 entries, ttest cannot be performed
    // this can happen when grouped samples don't belong to selected experiment
    if (diamondActivities.length < 2 && spadeActivities.length < 2)
      return null;

    // compute difference between spade and diamond activity means
    const meanDiff = mean(spadeActivities) - mean(diamondActivities);
    // compute p value of signature based using t test from ttest library
    const pValue = ttest(diamondActivities, spadeActivities);

    return {
      ...signature,
      meanDiff,
      pValue
    };
  });

  // if any of the volcano sigs are invalid, return blank
  // this can happen when grouped samples don't belong to selected experiment
  if (volcanoSignatures.some((d) => d === null))
    return [];

  // extract p values from volcano signatures into array
  const pValues = volcanoSignatures.map((signature) => signature.pValue);
  // correct p values using false discovery rate function from multtest library
  const correctedPValues = fdr(pValues);
  // put corrected p values back into volcano signatures
  volcanoSignatures = volcanoSignatures.map((volcanoSignature, index) => ({
    ...volcanoSignature,
    pValue: correctedPValues[index],
    // negative log 10 transform
    pValueTrans: -Math.log10(correctedPValues[index])
  }));

  return volcanoSignatures;
};

// calculate enriched gene sets
// adapted from https://github.com/greenelab/adage-server/blob/master/interface/src/app/signature/signature.js
export const calculateEnrichedGenes = ({
  pickledGenes,
  signatureParticipations,
  geneList
}) => {
  // if we don't have all we need, exit
  if (
    !isArray(geneList) ||
    !geneList.length ||
    !isArray(signatureParticipations) ||
    !signatureParticipations.length ||
    !isObject(pickledGenes)
  )
    return [];

  const { genes, sets } = pickledGenes;
  // genes:
  // object of genes and all the sets each of them belong to by set id
  // sets:
  // object of sets and their relevant info

  // convert key/value map to array
  const enrichedGenes = Object.entries(genes).map(([geneId, setList]) => ({
    ...(geneList.find((gene) => geneId === String(gene.entrezId)) || {}),
    list: setList
  }));
  let enrichedGeneSets = Object.entries(sets).map(
    ([setId, { dbase, ...setInfo }]) => ({
      id: setId,
      ...setInfo,
      // rename dbase field to database to be consistent
      database: dbase
    })
  );

  // count number of total number of genes participating in signature and
  // found in any of gene sets
  const participatingGenes = signatureParticipations.filter((participation) =>
    enrichedGenes.find((gene) => gene.id === participation.gene)).length;

  // for each set
  enrichedGeneSets = enrichedGeneSets
    // make list of genes looking them up in genes object
    .map((set) => ({
      ...set,
      genes: enrichedGenes
        .filter((enrichedGene) => enrichedGene.list.includes(set.id))
        // filter out unnecessary gene information to reduce memory usage
        .map(({ id, standardName, externalUrl }) => ({
          id,
          standardName,
          externalUrl
        }))
    }))
    // find genes in set that also participate in signature
    .map((set) => ({
      ...set,
      participatingGenes: set.genes.filter((gene) =>
        signatureParticipations.find(
          (participation) => gene.id === participation.gene
        ))
    }))
    // filter out sets with no overlapping genes
    .filter((set) => set.participatingGenes.length);

  enrichedGeneSets = enrichedGeneSets
    // compute p value of set
    .map((set) => {
      // # of unique genes in gene sets
      const N = enrichedGenes.length;
      // # of genes participating in signature and found in any of gene sets
      const K = participatingGenes;
      // # of genes in set
      const n = set.genes.length;
      // # of genes in set and in signature
      const k = set.participatingGenes.length;

      const pValue = hyperGeometricTest(k, K, n, N);

      return { ...set, pValue };
    });

  // extract p values from enriched gene sets into array
  const pValues = enrichedGeneSets.map((signature) => signature.pValue);
  // correct p values using false discovery rate function from multtest library
  const correctedPValues = fdr(pValues);
  // put corrected p values back into enriched gene sets
  enrichedGeneSets = enrichedGeneSets.map((enrichedGeneSet, index) => ({
    ...enrichedGeneSet,
    pValue: correctedPValues[index]
  }));

  return enrichedGeneSets;
};

// arbitrary cutoff below which p values have no meaning
export const epsilon = 1e-8;
