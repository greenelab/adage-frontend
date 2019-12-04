import { server } from '.';
import { fetchJson } from '.';

const prefix = 'gene/';

export const fetchGeneDetails = async ({ id }) => {
  const url = server + prefix + id;
  return fetchJson(url);
};

export const fetchGeneSearch = async ({ search }) => {
  const params = new URLSearchParams();
  if (search)
    params.set('autocomplete', search);

  const url = server + prefix + '?' + params.toString();

  return fetchJson(url);
};
