import decode from 'unescape';

import { isString } from './types';
import { isObject } from './types';
import { isBlank } from './types';
import { toHumanCase } from './string';
import { toCamelCase } from './string';

export const flatten = (object, depth = 0) => {
  if (!isObject(object))
    return object;

  let result = {};
  for (const [key, value] of Object.entries(object)) {
    if (isObject(value) && depth > 0)
      result = { ...result, ...flatten(value, depth - 1) };
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

export const normalizeValue = (value) => {
  if (isBlank(value))
    return '-';

  if (isString(value)) {
    if (!value.trim())
      return '-';
    else
      return decode(value);
  }

  return value;
};

export const normalizeValues = (object) => {
  object = { ...object };
  for (const [key, value] of Object.entries(object))
    object[key] = normalizeValue(value);
  return object;
};

export const clean = (object, human) =>
  [flatten, human ? humanizeKeys : camelizeKeys, normalizeValues].reduce(
    (object, func) => func(object),
    object
  );
