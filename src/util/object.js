import { isObject } from './types';
import { humanizeString } from './string';
import { camelizeString } from './string';

export const flattenObject = (object) => {
  if (!isObject(object))
    return object;

  let result = {};
  for (const [key, value] of Object.entries(object)) {
    if (isObject(value))
      result = { ...result, ...flattenObject(value) };
    else
      result[key] = value;
  }
  return result;
};

export const humanizeObject = (object) => {
  object = { ...object };
  for (const key of Object.keys(object)) {
    const newKey = humanizeString(key);
    if (key !== newKey) {
      object[newKey] = object[key];
      delete object[key];
    }
  }
  return object;
};

export const camelizeObject = (object) => {
  object = { ...object };
  for (const key of Object.keys(object)) {
    const newKey = camelizeString(key);
    if (key !== newKey) {
      object[newKey] = object[key];
      delete object[key];
    }
  }
  return object;
};
