import decode from 'unescape';

import { isString } from './types';
import { isObject } from './types';
import { isBlank } from './types';
import { toHumanCase } from './string';
import { toCamelCase } from './string';

// flatten object to a certain depth
// eg { a: 2, b: { c: 3 } } --> { a: 2, c: 3 }
export const flatten = (object, depth = 0) => {
  object = { ...object };

  if (depth <= 0 || !isObject(object))
    return object;

  let result = {};
  for (const [key, value] of Object.entries(object)) {
    if (isObject(value))
      result = { ...result, ...flatten(value, depth - 1) };
    else
      result[key] = value;
  }

  return result;
};

// go through keys of object and convert to Human Case
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

// go through keys of object and convert to camelCase
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

// go through keys of object and delete unwanted
export const filterKeys = (object, filter = [], whiteList = false) => {
  object = { ...object };

  for (const key of Object.keys(object)) {
    if (filter.includes(key) !== whiteList)
      delete object[key];
  }

  return object;
};

// "clean" value. decode html within strings, show falsey values as a dash
export const cleanValue = (value) => {
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

// go through values of object and "clean" them
export const cleanValues = (object) => {
  object = { ...object };

  for (const [key, value] of Object.entries(object))
    object[key] = cleanValue(value);

  return object;
};

// flatten, case-ize, filter, and clean object
export const normalize = (object) => {
  object = flatten(object, 1);
  object = camelizeKeys(object);
  object = cleanValues(object);

  return object;
};

// stringify an object
export const stringifyObject = (object) => JSON.stringify(object);

// attempt to parse a stringified object
export const parseObject = (value) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
};
