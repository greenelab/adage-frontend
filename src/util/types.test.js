import { isNumber } from './types';
import { isString } from './types';
import { isArray } from './types';
import { isObject } from './types';
import { isEmpty } from './types';
import { isBlank } from './types';

test('is number', () => {
  // should be
  expect(isNumber(12)).toBe(true);
  expect(isNumber(-12)).toBe(true);
  expect(isNumber(0)).toBe(true);
  expect(isNumber(Infinity)).toBe(true);

  // shouldn't be
  expect(isNumber(true)).toBe(false);
  expect(isNumber('12')).toBe(false);
  expect(isNumber('0')).toBe(false);
  expect(isNumber(NaN)).toBe(false);
  expect(isNumber(null)).toBe(false);
  expect(isNumber({})).toBe(false);
  expect(isNumber([])).toBe(false);
});

test('is string', () => {
  // should be
  expect(isString('12')).toBe(true);
  expect(isString('')).toBe(true);

  // shouldn't be
  expect(isString(true)).toBe(false);
  expect(isString(12)).toBe(false);
  expect(isString(NaN)).toBe(false);
  expect(isString(null)).toBe(false);
  expect(isString({})).toBe(false);
  expect(isString([])).toBe(false);
});

test('is object', () => {
  // should be
  expect(isObject({})).toBe(true);
  expect(isObject({ abc: 123 })).toBe(true);

  // shouldn't be
  expect(isObject(true)).toBe(false);
  expect(isObject(12)).toBe(false);
  expect(isObject('12')).toBe(false);
  expect(isObject('')).toBe(false);
  expect(isObject(NaN)).toBe(false);
  expect(isObject(null)).toBe(false);
  expect(isObject([])).toBe(false);
});

test('is array', () => {
  // should be
  expect(isArray([])).toBe(true);
  expect(isArray([1, 2, 3])).toBe(true);

  // shouldn't be
  expect(isArray(true)).toBe(false);
  expect(isArray(12)).toBe(false);
  expect(isArray('12')).toBe(false);
  expect(isArray('')).toBe(false);
  expect(isArray(NaN)).toBe(false);
  expect(isArray(null)).toBe(false);
  expect(isArray({})).toBe(false);
});

test('is empty', () => {
  // should be
  expect(isEmpty([])).toBe(true);
  expect(isEmpty({})).toBe(true);

  // shouldn't be
  expect(isEmpty(true)).toBe(false);
  expect(isEmpty(12)).toBe(false);
  expect(isEmpty('12')).toBe(false);
  expect(isEmpty('')).toBe(false);
  expect(isEmpty(NaN)).toBe(false);
  expect(isEmpty(null)).toBe(false);
  expect(isEmpty({ abc: 123 })).toBe(false);
  expect(isEmpty([1, 2, 3])).toBe(false);
});

test('is blank', () => {
  // should be
  expect(isBlank([])).toBe(true);
  expect(isBlank({})).toBe(true);
  expect(isBlank(NaN)).toBe(true);
  expect(isBlank('')).toBe(true);
  expect(isBlank('    ')).toBe(true);
  expect(isBlank(null)).toBe(true);
  expect(isBlank(undefined)).toBe(true);

  // shouldn't be
  expect(isBlank(true)).toBe(false);
  expect(isBlank(12)).toBe(false);
  expect(isBlank(0)).toBe(false);
  expect(isBlank(Infinity)).toBe(false);
  expect(isBlank('12')).toBe(false);
  expect(isBlank({ abc: 123 })).toBe(false);
  expect(isBlank([1, 2, 3])).toBe(false);
});
