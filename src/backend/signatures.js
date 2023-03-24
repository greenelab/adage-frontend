import { server } from '.';
import { maxLimit } from '.';

// functions to generate urls to fetch signature-related data from

const prefixA = 'signature/';
const prefixB = 'participation/';
const prefixC = 'activity/';

export const urlSignatureList = ({ model, limit = maxLimit }) => {
  const params = new URLSearchParams();
  params.set('limit', limit);
  if (model)
    params.set('mlmodel', model);

  const url = server + prefixA + '?' + params.toString();
  return url;
};

export const urlSignatureParticipations = ({
  signature,
  limit = maxLimit
}) => {
  const params = new URLSearchParams();
  params.set('limit', limit);
  if (signature)
    params.set('signature', signature);

  const url = server + prefixB + '?' + params.toString();
  return url;
};

export const urlSignatureActivities = ({
  model,
  signatures,
  limit = maxLimit
}) => {
  const params = new URLSearchParams();
  params.set('limit', limit);
  if (model)
    params.set('mlmodel', model);
  if (signatures)
    params.set('signatures', signatures.join(','));

  const url = server + prefixC + '?' + params.toString();
  return url;
};

export const urlPickledGenes = (taxonomyId) => {
  const params = new URLSearchParams();
  if (taxonomyId)
    params.set('species', taxonomyId);
  params.set('fields', 'all');
  params.set("always_list", "genes")
  
  const url = 'https://mygeneset.info/v1/query?' + params.toString();
  return url;
};
