import { mean } from './math';
import { hyperGeometricTest } from './math';
import { ttest } from './math';
import { calculateEnrichedSignatures } from './math';

import selectedGenes from '../dummy-data/selected-genes.json';
import participations from '../dummy-data/participations.json';
import geneList from '../dummy-data/gene-list.json';
import signatureList from '../dummy-data/signature-list.json';
import enrichedSignatures from '../dummy-data/enriched-signatures.json';

test('mean', () => {
  expect(mean([1, 2, 3])).toBe(2);
  expect(mean([1, 12, 123])).toBeCloseTo(45.3333333333, 10);
  expect(mean([])).toBe(null);
  expect(mean([1, 2, 'a', 3])).toBe(NaN);
});

test('hypergeometric test', () => {
  // compare to >= results from:
  // https://stattrek.com/online-calculator/hypergeometric.aspx
  // compare to results from equivalent R commands:
  // k <- 1; K <- 5; n <- 10; N <- 50; sum <- 0; for(i in k:K) { sum <- sum + dhyper(i, K, N-K, n); }; print(sum);
  let k = 1;
  const K = 5;
  const n = 10;
  const N = 50;
  expect(1 - hyperGeometricTest(k, K, n, N)).toBeCloseTo(0.689437218, 10);
  k = 2;
  expect(1 - hyperGeometricTest(k, K, n, N)).toBeCloseTo(0.2581000208, 10);
  k = 3;
  expect(1 - hyperGeometricTest(k, K, n, N)).toBeCloseTo(0.0482603032, 10);
  k = 4;
  expect(1 - hyperGeometricTest(k, K, n, N)).toBeCloseTo(0.0040835205, 10);
  k = 5;
  expect(1 - hyperGeometricTest(k, K, n, N)).toBeCloseTo(0.0001189375, 10);
});

test('ttest', () => {
  // compare to results from equivalent R commands:
  // t.test(c(0.7, -1.6, -0.2, -1.2, -0.1, 3.4, 3.7, 0.8, 0.0, 2.0), c(1.9, 0.8, 1.1, 0.1, -0.1, 4.4, 5.5, 1.6, 4.6, 3.4))[[3]]
  expect(
    ttest(
      [0.7, -1.6, -0.2, -1.2, -0.1, 3.4, 3.7, 0.8, 0.0, 2.0],
      [1.9, 0.8, 1.1, 0.1, -0.1, 4.4, 5.5, 1.6, 4.6, 3.4]
    )
  ).toBeCloseTo(0.0793941402, 10);

  // compare to results from equivalent R commands:
  // t.test(c(0.002297313, -2.01655, 0.8762991, -0.04565538, 0.4066173, -1.74174, -0.6146424, -0.2181745, -0.8356771, 0.802121, -0.4595774, -0.5659323, 0.4222257, 0.5426019, -0.7335135, 1.300052, 0.6424826, -0.4537989, -0.05198576, 0.6700204, 0.6788123, 0.1883912, -0.1741902, -0.4503932, -1.098071, -0.3783309, 2.694307, -0.3503489, 0.8662056, -0.2275408), c(0.3987437, -1.009402, 0.2637079, 1.040592, 1.531982, 1.962857, 1.167957, -0.08074605, 2.429232, 0.6606925, 1.865024, 0.9308863, 0.9875501, 0.5189416, 1.022688, 0.002726125, 1.695041, 1.874482, -0.1429274, -1.328964, 1.668616, -0.2354719, -0.3779898, 1.169342, 1.557759, 1.793148, -1.409778, 1.660374, 2.101568, 1.057995))
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
      participations: 'LOADING',
      signatureList: 'LOADING'
    })
  ).toStrictEqual([]);

  expect(
    calculateEnrichedSignatures({
      selectedGenes: 'LOADING',
      participations: [],
      geneList: 'LOADING',
      signatureList: []
    })
  ).toStrictEqual([]);

  expect(
    calculateEnrichedSignatures({
      selectedGenes: [1, 2, 3, 4, 5],
      participations: [],
      geneList: [],
      signatureList: []
    })
  ).toStrictEqual([]);

  expect(
    calculateEnrichedSignatures({
      selectedGenes,
      participations,
      geneList,
      signatureList
    })
  ).toStrictEqual(enrichedSignatures);
});
