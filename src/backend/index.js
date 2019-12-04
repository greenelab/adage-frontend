import { sleep } from '../util/debug.js';

export const server = 'https://py3-adage.greenelab.com/api/v1/';

export const fetchJson = async (url) => {
  // artificial delay for testing
  await sleep(1000);

  const cachedResponse = window.sessionStorage.getItem(url);
  if (cachedResponse)
    return JSON.parse(cachedResponse);

  let response = await fetch(url);
  if (!response.ok)
    error('Response error', url, response.status, response.statusText);

  try {
    response = await response.json();
  } catch (e) {
    error('Could not parse as JSON', url, response.status, response.statusText);
  }

  if (response.results)
    response = response.results;

  window.sessionStorage.setItem(url, JSON.stringify(response));

  return response;
};

const error = (...args) => {
  const message = [...args]
    .map((arg) => (typeof arg === 'string' ? arg : String(JSON.stringify(arg))))
    .map((arg) => arg.slice(0, 100))
    .join('\n');

  throw new Error(message);
};
