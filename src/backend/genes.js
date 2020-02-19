import { server } from '.';
import { defaultLimit } from '.';

// functions to generate urls to fetch gene-related data from

const prefixA = 'gene/';
const prefixB = 'participation/';
const prefixC = 'edge/';

export const urlGeneDetails = ({ id }) => {
  const url = server + prefixA + id;
  return url;
};

export const urlGeneList = ({ organism, limit = defaultLimit }) => {
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

export const urlParticipations = ({ ids, limit = defaultLimit }) => {
  const params = new URLSearchParams();
  params.set('limit', limit);
  if (ids)
    params.set('related-genes', ids.join(','));

  const url = server + prefixB + '?' + params.toString();
  return url;
};

export const urlGeneEdges = ({ modelId, geneIds, limit = defaultLimit }) => {
  const params = new URLSearchParams();
  params.set('limit', limit);
  if (modelId)
    params.set('mlmodel', modelId);
  if (geneIds)
    params.set('genes', geneIds.join(','));

  const url = server + prefixC + '?' + params.toString();
  return url;
};
