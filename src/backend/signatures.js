import { server } from '.';
import { defaultLimit } from '.';

const prefix = 'signature/';

export const urlSignatureDetails = ({ id }) => {
  const url = server + prefix + id;
  return url;
};

export const urlSignatureList = ({ limit = defaultLimit }) => {
  const params = new URLSearchParams();
  params.set('limit', limit);
  const url = server + prefix + '?' + params.toString();
  return url;
};
