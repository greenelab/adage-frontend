import { isObject } from './types';

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
