import fetch from 'node-fetch';

import { isNumber } from './util/types.js';

import head from '../package.json';

const upstream =
  'https://raw.githubusercontent.com/greenelab/adage-frontend/master/package.json';

// check if next version string is "greater" than previous
const compareVersions = (previous, next) => {
  // convert strings to arrays of numbers, split by dot
  previous = previous
    .split('.')
    .map((token) => token.trim())
    .filter((token) => token)
    .map((token) => Number(token));
  next = next
    .split('.')
    .map((token) => token.trim())
    .filter((token) => token)
    .map((token) => Number(token));

  // fail if number of tokens not equal
  if (!previous.length || !next.length)
    return false;

  // fail if any of tokens not number
  if (previous.some((token) => !isNumber(token)))
    return false;
  if (next.some((token) => !isNumber(token)))
    return false;

  // compare tokens
  for (let token = 0; token < Math.max(previous.length, next.length); token++) {
    if (next[token] > previous[token])
      return true;
    if (next[token] < previous[token])
      return false;
  }

  // otherwise, fail test
  return false;
};

// run version comparison on head (this branch/PR) vs upstream (master)
test('version number updated', async () => {
  const result = await (await fetch(upstream)).json();
  const updated = compareVersions(result.version, head.version);
  console.log('Previous (upstream) version:', result.version);
  console.log('Next (current head) version:', head.version);
  expect(updated).toEqual(true);
});
