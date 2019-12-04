import { server } from '.';
import { fetchJson } from '.';

const prefix = 'model/';

export const fetchModelDetails = async ({ id }) => {
  const url = server + prefix + id;
  return fetchJson(url);
};

export const fetchModelList = async () => {
  const url = server + prefix;
  return fetchJson(url);
};
