export const isNumber = (value) =>
  typeof value === 'number' && !Number.isNaN(value);

export const isString = (value) => typeof value === 'string';

export const isArray = (value) => Array.isArray(value);

export const isObject = (value) =>
  !isArray(value) && typeof value === 'object' && value !== null;

export const isEmpty = (payload) =>
  (isArray(payload) && !payload.length) ||
  (isObject(payload) && !Object.keys(payload).length);

export const isBlank = (value) =>
  value === undefined ||
  value === null ||
  isEmpty(value) ||
  (isString(value) && value.trim() === '') ||
  Number.isNaN(value);
