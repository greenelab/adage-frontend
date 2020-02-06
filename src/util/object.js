import decode from 'unescape';

import { isString } from './types';
import { isNumber } from './types';
import { isObject } from './types';
import { toHumanCase } from './string';
import { toCamelCase } from './string';

export const flatten = (object) => {
  if (!isObject(object))
    return object;

  let result = {};
  for (const [key, value] of Object.entries(object)) {
    if (isObject(value))
      result = { ...result, ...flatten(value) };
    else
      result[key] = value;
  }
  return result;
};

export const humanizeKeys = (object) => {
  object = { ...object };
  for (const key of Object.keys(object)) {
    const newKey = toHumanCase(key);
    if (key !== newKey) {
      object[newKey] = object[key];
      delete object[key];
    }
  }
  return object;
};

export const camelizeKeys = (object) => {
  object = { ...object };
  for (const key of Object.keys(object)) {
    const newKey = toCamelCase(key);
    if (key !== newKey) {
      object[newKey] = object[key];
      delete object[key];
    }
  }
  return object;
};

export const normalizeValues = (object) => {
  object = { ...object };
  for (const [key, value] of Object.entries(object)) {
    if (isNumber(value))
      object[key] = value;
    else if (isString(value))
      object[key] = decode(value);
    else
      object[key] = '-';
  }
  return object;
};

export const clean = (object, human) =>
  [flatten, human ? humanizeKeys : camelizeKeys, normalizeValues].reduce(
    (object, func) => func(object),
    object
  );
