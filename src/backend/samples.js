import { server } from '.';

// functions to generate urls to fetch sample-related data from

const prefix = 'sample/';

export const urlSampleDetails = ({ id }) => {
  const url = server + prefix + id;
  return url;
};
