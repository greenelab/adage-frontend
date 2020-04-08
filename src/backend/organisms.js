import { server } from '.';

// functions to generate urls to fetch organism-related data from

const prefix = 'organism/';

export const urlOrganismList = () => {
  const url = server + prefix;
  return url;
};
