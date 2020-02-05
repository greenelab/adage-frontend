import { server } from '.';

const prefix = 'sample/';

export const urlSampleDetails = ({ id }) => {
  const url = server + prefix + id;
  return url;
};
