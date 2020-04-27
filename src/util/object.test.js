import { flatten } from './object';
import { humanizeKeys } from './object';
import { camelizeKeys } from './object';
import { filterKeys } from './object';
import { toHumanCase } from './string';
import { toCamelCase } from './string';
import { cleanValue } from './object';
import { unique } from './object';

test('flatten object', () => {
  expect(
    flatten(
      {
        a: 1,
        b: {
          c: 2
        }
      },
      1
    )
  ).toStrictEqual({
    a: 1,
    c: 2
  });

  expect(
    flatten(
      {
        a: 1,
        b: {
          c: {
            d: 4
          }
        }
      },
      1
    )
  ).toStrictEqual({
    a: 1,
    c: {
      d: 4
    }
  });

  expect(
    flatten(
      {
        a: 1,
        b: {
          c: {
            d: 4
          }
        }
      },
      2
    )
  ).toStrictEqual({
    a: 1,
    d: 4
  });

  expect(
    flatten(
      {
        a: {
          b: [1, 2, 3, 4],
          c: {
            d: [5, 6, 7, 8]
          }
        }
      },
      2
    )
  ).toStrictEqual({
    b: [1, 2, 3, 4],
    d: [5, 6, 7, 8]
  });
});

test('humanize keys', () => {
  expect(
    humanizeKeys({
      hello_adage: null,
      test_string_3: null
    })
  ).toStrictEqual({
    [toHumanCase('hello_adage')]: null,
    [toHumanCase('test_string_3')]: null
  });
});

test('camelize keys', () => {
  expect(
    camelizeKeys({
      hello_adage: null,
      test_string_3: null
    })
  ).toStrictEqual({
    [toCamelCase('hello_adage')]: null,
    [toCamelCase('test_string_3')]: null
  });
});

test('filter keys', () => {
  expect(
    filterKeys(
      {
        cat: null,
        dog: null,
        fish: null,
        goat: null,
        rabbit: null,
        turtle: null
      },
      ['dog', 'rabbit']
    )
  ).toStrictEqual({
    cat: null,
    fish: null,
    goat: null,
    turtle: null
  });

  expect(
    filterKeys(
      {
        cat: null,
        dog: null,
        fish: null,
        goat: null,
        rabbit: null,
        turtle: null
      },
      ['dog', 'rabbit'],
      true
    )
  ).toStrictEqual({
    dog: null,
    rabbit: null
  });
});

test('clean value', () => {
  expect(cleanValue(123)).toBe(123);
  expect(cleanValue('hi')).toBe('hi');
  expect(cleanValue({ hello: 123 })).toStrictEqual({ hello: 123 });
  expect(cleanValue([1, 2, 3])).toStrictEqual([1, 2, 3]);
  expect(cleanValue('')).toBe('-');
  expect(cleanValue([])).toBe('-');
  expect(cleanValue({})).toBe('-');
  expect(cleanValue(NaN)).toBe('-');
  expect(cleanValue('&#38;')).toBe('&');
  expect(cleanValue('&amp;')).toBe('&');
  expect(cleanValue('&#34;')).toBe('"');
  expect(cleanValue('&quot;')).toBe('"');
});

test('unique', () => {
  expect(
    unique([1, 2, 2, 3, 3, 4, 4, 5, 6, 6, 1, 2, 7])
  ).toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
});
