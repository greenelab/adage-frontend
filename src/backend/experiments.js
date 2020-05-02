import { server } from '.';
import { defaultLimit } from '.';
import { maxLimit } from '.';

// functions to generate urls to fetch experiment-related data from

const prefix = 'experiment/';

export const urlExperimentList = ({ limit = maxLimit }) => {
  const params = new URLSearchParams();
  params.set('limit', limit);

  const url = server + prefix + '?' + params.toString();
  return url;
};

export const urlExperimentSearch = ({ query, limit = defaultLimit }) => {
  const params = new URLSearchParams();
  params.set('limit', limit);
  if (query)
    params.set('autocomplete', query);

  const url = server + prefix + '?' + params.toString();
  return url;
};
