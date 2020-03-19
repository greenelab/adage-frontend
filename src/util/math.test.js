import { mean } from './math';
import { hyperGeometricTest } from './math';
import { ttest } from './math';
import { fdr } from 'multtest';
import { calculateEnrichedSignatures } from './math';
import { calculateVolcanoSignatures } from './math';

import selectedGenes from '../dummy-data/selected-genes.json';
import geneParticipations from '../dummy-data/gene-participations.json';
import geneList from '../dummy-data/gene-list.json';
import signatureList from '../dummy-data/signature-list.json';
import activities from '../dummy-data/activities.json';
import enrichedSignatures from '../dummy-data/enriched-signatures.json';
import volcanoSignatures from '../dummy-data/volcano-signatures.json';

test('mean', () => {
  expect(mean([1, 2, 3])).toBe(2);
  expect(mean([1, 12, 123])).toBeCloseTo(45.3333333333, 10);
  expect(mean([])).toBe(null);
  expect(mean([1, 2, 'a', 3])).toBe(NaN);
});

test('hypergeometric test', () => {
  // compare to results from equivalent R commands:
  // k <- 1; K <- 5; n <- 10; N <- 50; sum <- 0; for(i in k:K) { sum <- sum + dhyper(i, K, N-K, n); }; print(sum, digits = 20);
  const K = 5;
  const n = 10;
  const N = 50;
  let k = 0;
  expect(hyperGeometricTest(k, K, n, N)).toBe(1);
  k = 1;
  expect(hyperGeometricTest(k, K, n, N)).toBeCloseTo(0.689437218, 10);
  k = 2;
  expect(hyperGeometricTest(k, K, n, N)).toBeCloseTo(0.2581000208, 10);
  k = 3;
  expect(hyperGeometricTest(k, K, n, N)).toBeCloseTo(0.0482603032, 10);
  k = 4;
  expect(hyperGeometricTest(k, K, n, N)).toBeCloseTo(0.0040835205, 10);
  k = 5;
  expect(hyperGeometricTest(k, K, n, N)).toBeCloseTo(0.0001189375, 10);
  k = 6;
  expect(hyperGeometricTest(k, K, n, N)).toBe(0);
});

test('ttest', () => {
  // compare to results from equivalent R commands:
  // print(t.test(c(0.7, -1.6, -0.2, -1.2, -0.1, 3.4, 3.7, 0.8, 0.0, 2.0), c(1.9, 0.8, 1.1, 0.1, -0.1, 4.4, 5.5, 1.6, 4.6, 3.4)), digits = 20)
  expect(
    ttest(
      [0.7, -1.6, -0.2, -1.2, -0.1, 3.4, 3.7, 0.8, 0.0, 2.0],
      [1.9, 0.8, 1.1, 0.1, -0.1, 4.4, 5.5, 1.6, 4.6, 3.4]
    )
  ).toBeCloseTo(0.0793941402, 10);

  // compare to results from equivalent R commands:
  // print(t.test(c(0.002297313, -2.01655, 0.8762991, -0.04565538, 0.4066173, -1.74174, -0.6146424, -0.2181745, -0.8356771, 0.802121, -0.4595774, -0.5659323, 0.4222257, 0.5426019, -0.7335135, 1.300052, 0.6424826, -0.4537989, -0.05198576, 0.6700204, 0.6788123, 0.1883912, -0.1741902, -0.4503932, -1.098071, -0.3783309, 2.694307, -0.3503489, 0.8662056, -0.2275408), c(0.3987437, -1.009402, 0.2637079, 1.040592, 1.531982, 1.962857, 1.167957, -0.08074605, 2.429232, 0.6606925, 1.865024, 0.9308863, 0.9875501, 0.5189416, 1.022688, 0.002726125, 1.695041, 1.874482, -0.1429274, -1.328964, 1.668616, -0.2354719, -0.3779898, 1.169342, 1.557759, 1.793148, -1.409778, 1.660374, 2.101568, 1.057995)), digits = 20)
  expect(
    ttest(
      [
        0.002297313,
        -2.01655,
        0.8762991,
        -0.04565538,
        0.4066173,
        -1.74174,
        -0.6146424,
        -0.2181745,
        -0.8356771,
        0.802121,
        -0.4595774,
        -0.5659323,
        0.4222257,
        0.5426019,
        -0.7335135,
        1.300052,
        0.6424826,
        -0.4537989,
        -0.05198576,
        0.6700204,
        0.6788123,
        0.1883912,
        -0.1741902,
        -0.4503932,
        -1.098071,
        -0.3783309,
        2.694307,
        -0.3503489,
        0.8662056,
        -0.2275408
      ],
      [
        0.3987437,
        -1.009402,
        0.2637079,
        1.040592,
        1.531982,
        1.962857,
        1.167957,
        -0.08074605,
        2.429232,
        0.6606925,
        1.865024,
        0.9308863,
        0.9875501,
        0.5189416,
        1.022688,
        0.002726125,
        1.695041,
        1.874482,
        -0.1429274,
        -1.328964,
        1.668616,
        -0.2354719,
        -0.3779898,
        1.169342,
        1.557759,
        1.793148,
        -1.409778,
        1.660374,
        2.101568,
        1.057995
      ]
    )
  ).toBeCloseTo(0.0015663897, 10);
});

test('calculate enriched signatures', () => {
  expect(
    calculateEnrichedSignatures({
      geneParticipations: 'LOADING',
      signatureList: 'LOADING'
    })
  ).toStrictEqual([]);

  expect(
    calculateEnrichedSignatures({
      selectedGenes: 'LOADING',
      geneParticipations: [],
      geneList: 'LOADING',
      signatureList: []
    })
  ).toStrictEqual([]);

  expect(
    calculateEnrichedSignatures({
      selectedGenes: [1, 2, 3, 4, 5],
      geneParticipations: [],
      geneList: [],
      signatureList: []
    })
  ).toStrictEqual([]);

  expect(
    calculateEnrichedSignatures({
      selectedGenes,
      geneParticipations,
      geneList,
      signatureList
    }).map((signature) => ({
      id: signature.id,
      name: signature.name,
      mlmodel: signature.mlmodel,
      selectedParticipatingGenes: signature.selectedParticipatingGenes.map(
        (g) => g.id
      ),
      pValue: signature.pValue
    }))
  ).toStrictEqual(enrichedSignatures);
});

test('false discovery rate', () => {
  // compare to results from equivalent R commands
  // print(p.adjust(c(0.689437218, 0.2581000208, 0.0482603032, 0.0040835205, 0.0001189375), "fdr"), digits = 20)
  expect(
    fdr([
      0.689437218,
      0.2581000208,
      0.0482603032,
      0.0040835205,
      0.0001189375
    ]).map((value) => Number(value.toFixed(10)))
  ).toEqual([
    0.689437218,
    0.322625026,
    0.0804338387,
    0.0102088012,
    0.0005946875
  ]);

  // compare to results from equivalent R commands
  // print(p.adjust(c(0.50737464, 0.19491067, 0.70651521, 0.18409645, 0.12852020, 0.99336303, 0.05110014, 0.54454504, 0.27567967, 0.96049284, 0.76375006, 0.95913694, 0.58669825, 0.64423308, 0.08539208, 0.69688756, 0.14988072, 0.04168663, 0.35820879, 0.20795287, 0.60731184, 0.40967885, 0.57542731, 0.13704495, 0.01209222, 0.51657558, 0.45194966, 0.65708676, 0.95112352, 0.28213190, 0.51589586, 0.64646605, 0.21931969, 0.35188851, 0.94193562, 0.61266120, 0.38419469, 0.74500034, 0.65281975, 0.02519793), "fdr"), digits = 20)
  expect(
    fdr([
      0.50737464,
      0.19491067,
      0.70651521,
      0.18409645,
      0.1285202,
      0.99336303,
      0.05110014,
      0.54454504,
      0.27567967,
      0.96049284,
      0.76375006,
      0.95913694,
      0.58669825,
      0.64423308,
      0.08539208,
      0.69688756,
      0.14988072,
      0.04168663,
      0.35820879,
      0.20795287,
      0.60731184,
      0.40967885,
      0.57542731,
      0.13704495,
      0.01209222,
      0.51657558,
      0.45194966,
      0.65708676,
      0.95112352,
      0.2821319,
      0.51589586,
      0.64646605,
      0.21931969,
      0.35188851,
      0.94193562,
      0.6126612,
      0.38419469,
      0.74500034,
      0.65281975,
      0.02519793
    ]).map((value) => Number(value.toFixed(10)))
  ).toEqual([
    0.8478538839,
    0.7310656333,
    0.8563820727,
    0.7310656333,
    0.7310656333,
    0.99336303,
    0.5110014,
    0.8478538839,
    0.8060911429,
    0.9851208615,
    0.8728572114,
    0.9851208615,
    0.8478538839,
    0.8478538839,
    0.68313664,
    0.8563820727,
    0.7310656333,
    0.5110014,
    0.8478538839,
    0.7310656333,
    0.8478538839,
    0.8478538839,
    0.8478538839,
    0.7310656333,
    0.4836888,
    0.8478538839,
    0.8478538839,
    0.8478538839,
    0.9851208615,
    0.8060911429,
    0.8478538839,
    0.8478538839,
    0.7310656333,
    0.8478538839,
    0.9851208615,
    0.8478538839,
    0.8478538839,
    0.8728572114,
    0.8478538839,
    0.5039586
  ]);
});

test('calculate volcano signatures', () => {
  expect(
    calculateVolcanoSignatures({
      signatureList: 'LOADING',
      activities: 'LOADING'
    })
  ).toStrictEqual([]);

  expect(
    calculateVolcanoSignatures({
      signatureList: 'LOADING',
      activities: [],
      diamondGroup: [],
      spadeGroup: []
    })
  ).toStrictEqual([]);

  expect(
    calculateVolcanoSignatures({
      signatureList: [1, 2, 3, 4, 5],
      activities: [],
      diamondGroup: [],
      spadeGroup: []
    })
  ).toStrictEqual([]);

  expect(
    calculateVolcanoSignatures({
      signatureList,
      activities,
      diamondGroup: [11, 12, 15],
      spadeGroup: [13, 14]
    })
  ).toStrictEqual(volcanoSignatures);
});
