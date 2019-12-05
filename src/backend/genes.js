import { server } from '.';
import { fetchJson } from '.';

const prefix = 'gene/';

export const fetchGeneDetails = async ({ id }) => {
  const url = server + prefix + id;
  return fetchJson(url);
};

export const fetchGeneSearch = async ({ string }) => {
  const params = new URLSearchParams();
  if (string)
    params.set('search', string);

  const url = server + prefix + '?' + params.toString();

  return fetchJson(url);
};
