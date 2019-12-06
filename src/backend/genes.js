import { server } from '.';
import { fetchJson } from '.';

const prefix = 'gene/';

export const fetchGeneDetails = async ({ id }) => {
  const url = server + prefix + id;
  return fetchJson(url);
};

export const fetchGeneSearch = async ({ query }) => {
  const params = new URLSearchParams();
  if (query)
    params.set('search', query);

  const url = server + prefix + '?' + params.toString();

  return fetchJson(url);
};
