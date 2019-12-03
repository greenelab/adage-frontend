import { server } from '.';
import { fetchJson } from '.';

const prefix = 'model/';

export const fetchModel = async ({ id }) => {
  const url = server + prefix + id;
  return fetchJson(url, true);
};

export const fetchModels = async () => {
  const url = server + prefix;
  return fetchJson(url);
};
