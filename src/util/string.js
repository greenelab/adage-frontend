import React from 'react';

import { epsilon } from './math';

// split string by lower to upper case and letter to number
// and convert to lower case
export const split = (string) =>
  string
    .replace(/[^a-zA-Z0-9]/g, ' ') // replace any non-alphanumeric with space
    .replace(/([A-Z])/g, ' $1') // put space before every capital letter
    .replace(/(.*)([0-9])/g, '$1$2 ') // put space before every first number
    .replace(/([0-9])(.*)/g, ' $1$2') // put space after every last number
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word);

// convert camelCase, underscore_case, and dash-case to Human Case
export const toHumanCase = (string) =>
  split(string)
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');

// convert camelCase, underscore_case, and dash-case to camelCase
export const toCamelCase = (string) =>
  split(string)
    .map((word, index) =>
      index > 0 ? word.charAt(0).toUpperCase() + word.substring(1) : word)
    .join('');

// test if string is link to external resource (on a different domain/host)
export const isExternalLink = (string) => {
  try {
    return new URL(string).hostname !== window.location.hostname;
  } catch (error) {
    return false;
  }
};

// turn list of transform operations and parameters into transform string
export const transformString = (...args) => {
  const validOps = [
    'translate',
    'rotate',
    'scale',
    'translateX',
    'translateY',
    'scaleX',
    'scaleY'
  ];

  const ops = [];
  for (const arg of args) {
    if (validOps.includes(arg))
      ops.push({ name: arg, params: [] });
    else
      ops[ops.length - 1].params.push(arg);
  }

  return ops.map((op) => op.name + '(' + op.params.join(', ') + ')').join(' ');
};

// format number as exponential
export const toExponential = (value, prefix = '') => {
  const number = parseFloat(value).toExponential();
  const mantissa = parseFloat(number.split('e')[0]).toFixed(2);
  const exponent = parseInt(number.split('e')[1]);

  if (Number.isNaN(mantissa) || Number.isNaN(exponent))
    return '-';

  return (
    <span className='nowrap'>
      {prefix}
      {mantissa} &times; 10<sup>{exponent}</sup>
    </span>
  );
};

// format number as p value, and show < epsilon if below javascript precision
export const toPValue = (value) => {
  let prefix = '';
  if (value < epsilon) {
    value = epsilon;
    prefix = '< ';
  }

  return toExponential(value, prefix);
};
