import { server } from '.';

const prefix = 'model/';

export const urlModelDetails = ({ id }) => {
  const url = server + prefix + id;
  return url;
};

export const urlModelList = () => {
  const url = server + prefix;
  return url;
};
