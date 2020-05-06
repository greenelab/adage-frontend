import { server } from '.';
import { defaultLimit } from '.';
import { maxLimit } from '.';

// functions to generate urls to fetch gene-related data from

const prefixA = 'gene/';
const prefixB = 'participation/';
const prefixC = 'edge/';

export const urlGeneList = ({ organism, limit = maxLimit }) => {
  const params = new URLSearchParams();
  params.set('limit', limit);
  if (organism)
    params.set('organism', organism);

  const url = server + prefixA + '?' + params.toString();
  return url;
};

export const urlGeneSearch = ({
  query,
  exact = false,
  limit = defaultLimit
}) => {
  const params = new URLSearchParams();
  params.set('limit', limit);
  if (query)
    params.set(exact ? 'search' : 'autocomplete', query);

  const url = server + prefixA + '?' + params.toString();
  return url;
};

export const urlGeneParticipations = ({ genes, limit = maxLimit }) => {
  const params = new URLSearchParams();
  params.set('limit', limit);
  if (genes)
    params.set('related-genes', genes.join(','));

  const url = server + prefixB + '?' + params.toString();
  return url;
};

export const urlGeneEdges = ({ model, genes, limit = maxLimit }) => {
  const params = new URLSearchParams();
  params.set('limit', limit);
  if (model)
    params.set('mlmodel', model);
  if (genes)
    params.set('genes', genes.join(','));

  const url = server + prefixC + '?' + params.toString();
  return url;
};
