import { server } from '.';
import { defaultLimit } from '.';

// functions to generate urls to fetch gene-related data from

const prefixA = 'gene/';
const prefixB = 'participation/';
const prefixC = 'edge/';

export const urlGeneList = ({ organismId, limit = defaultLimit }) => {
  const params = new URLSearchParams();
  params.set('limit', limit);
  if (organismId)
    params.set('organism', organismId);

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

export const urlGeneParticipations = ({ geneIds, limit = defaultLimit }) => {
  const params = new URLSearchParams();
  params.set('limit', limit);
  if (geneIds)
    params.set('related-genes', geneIds.join(','));

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
