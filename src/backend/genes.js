import { server } from '.';

const prefix = 'gene/';

export const urlGeneDetails = ({ id }) => {
  const url = server + prefix + id;
  return url;
};

export const urlGeneSearch = ({ query }) => {
  const params = new URLSearchParams();
  if (query)
    params.set('search', query);

  const url = server + prefix + '?' + params.toString();

  return url;
};
