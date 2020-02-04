import { server } from '.';
import { defaultLimit } from '.';

const prefix = 'experiment/';

export const urlExperimentDetails = ({ accession }) => {
  const url = server + prefix + accession;
  return url;
};

export const urlExperimentList = ({ limit = defaultLimit }) => {
  const params = new URLSearchParams();
  params.set('limit', limit);

  const url = server + prefix + '?' + params.toString();
  return url;
};

export const urlExperimentSearch = ({ query, limit = defaultLimit }) => {
  const params = new URLSearchParams();
  params.set('limit', limit);
  if (query)
    params.set('search', query);

  const url = server + prefix + '?' + params.toString();
  return url;
};
