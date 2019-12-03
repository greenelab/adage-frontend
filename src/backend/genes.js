import { server } from '.';
import { fetchJson } from '.';

const prefix = 'gene/';

export const fetchGene = async ({ id }) => {
  const url = server + prefix + id;
  return fetchJson(url, true);
};

export const fetchGenes = async ({ search }) => {
  const params = new URLSearchParams();
  if (search)
    params.set('autocomplete', search);

  const url = server + prefix + '?' + params.toString();

  return fetchJson(url);
};
