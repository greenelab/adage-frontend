import { server } from '.';
import { defaultLimit } from '.';

// functions to generate urls to fetch signature-related data from

const prefixA = 'signature/';
const prefixB = 'participation/';

export const urlSignatureDetails = ({ id }) => {
  const url = server + prefixA + id;
  return url;
};

export const urlSignatureList = ({ model, limit = defaultLimit }) => {
  const params = new URLSearchParams();
  params.set('limit', limit);
  if (model)
    params.set('mlmodel', model);

  const url = server + prefixA + '?' + params.toString();
  return url;
};

export const urlSignatureParticipations = ({ id, limit = defaultLimit }) => {
  const params = new URLSearchParams();
  params.set('limit', limit);
  if (id)
    params.set('signature', id);

  const url = server + prefixB + '?' + params.toString();
  return url;
};
