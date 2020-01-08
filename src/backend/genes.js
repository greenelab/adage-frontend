import { server } from '.';
import { defaultLimit } from '.';

const prefixA = 'gene/';
const prefixB = 'participation/';

export const urlGeneDetails = ({ id }) => {
  const url = server + prefixA + id;
  return url;
};

export const urlGeneCount = ({ organism, limit = defaultLimit }) => {
  const params = new URLSearchParams();
  params.set('limit', limit);
  if (organism)
    params.set('organism', organism);
  const url = server + prefixA + '?' + params.toString();
  return url;
};

export const urlGeneSearch = ({ query, limit = defaultLimit }) => {
  const params = new URLSearchParams();
  params.set('limit', limit);
  if (query)
    params.set('autocomplete', query);

  const url = server + prefixA + '?' + params.toString();

  return url;
};

export const urlGeneParticipations = ({ genes, limit = defaultLimit }) => {
  const params = new URLSearchParams();
  params.set('limit', limit);
  if (genes)
    params.set('related-genes', genes.join(','));

  const url = server + prefixB + '?' + params.toString();

  return url;
};
