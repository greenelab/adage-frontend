import { server } from '.';
import { defaultLimit } from '.';

// functions to generate urls to fetch sample-related data from

const prefix = 'sample/';

export const urlSampleDetails = ({ id }) => {
  const url = server + prefix + id;
  return url;
};

export const urlSampleList = ({ limit = defaultLimit }) => {
  const params = new URLSearchParams();
  params.set('limit', limit);

  const url = server + prefix + '?' + params.toString();
  return url;
};
