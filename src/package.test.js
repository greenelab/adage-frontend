const fetch = require('node-fetch');

const head = require('../package.json');
const upstream =
  'https://raw.githubusercontent.com/greenelab/adage-frontend/master/package.json';

const compareVersions = (previous, next) => {
  console.log('Previous (upstream) version:', previous);
  console.log('Next (current head) version:', next);

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

  if (!previous.length || !next.length)
    return false;

  if (
    previous.some((token) => typeof token !== 'number' || Number.isNaN(token))
  )
    return false;

  if (next.some((token) => typeof token !== 'number' || Number.isNaN(token)))
    return false;

  for (let token = 0; token < Math.max(previous.length, next.length); token++) {
    if (next[token] > previous[token])
      return true;
    if (next[token] < previous[token])
      return false;
  }
  return next.length > previous.length;
};

it('Version number updated', async () => {
  const result = await (await fetch(upstream)).json();
  const updated = compareVersions(result.version, head.version);
  expect(updated).toEqual(true);
});
