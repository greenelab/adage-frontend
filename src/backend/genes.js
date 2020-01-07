import { server } from '.';
import { defaultLimit } from '.';

const prefixA = 'gene/';
const prefixB = 'participation/';

export const urlGeneDetails = ({ id }) => {
  const url = server + prefixA + id;
  return url;
};

export const urlGeneSearch = ({ query, limit = defaultLimit }) => {
  const params = new URLSearchParams();
  if (query)
    params.set('autocomplete', query);
  params.set('limit', limit);

  const url = server + prefixA + '?' + params.toString();

  return url;
};

export const urlGeneParticipations = ({ genes, limit = defaultLimit }) => {
  const params = new URLSearchParams();
  if (genes)
    params.set('related-genes', genes.join(','));
  params.set('limit', limit);

  const url = server + prefixB + '?' + params.toString();

  return url;
};
