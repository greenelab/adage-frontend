import { server } from '.';
import { defaultLimit } from '.';

// functions to generate urls to fetch signature-related data from

const prefixA = 'signature/';
const prefixB = 'participation/';
const prefixC = 'activity/';

export const urlSignatureList = ({ modelId, limit = defaultLimit }) => {
  const params = new URLSearchParams();
  params.set('limit', limit);
  if (modelId)
    params.set('mlmodel', modelId);

  const url = server + prefixA + '?' + params.toString();
  return url;
};

export const urlSignatureParticipations = ({
  signatureId,
  limit = defaultLimit
}) => {
  const params = new URLSearchParams();
  params.set('limit', limit);
  if (signatureId)
    params.set('signature', signatureId);

  const url = server + prefixB + '?' + params.toString();
  return url;
};

export const urlSignatureActivities = ({
  modelId,
  signatureIds,
  limit = defaultLimit
}) => {
  const params = new URLSearchParams();
  params.set('limit', limit);
  if (modelId)
    params.set('mlmodel', modelId);
  if (signatureIds)
    params.set('signatures', signatureIds.join(','));

  const url = server + prefixC + '?' + params.toString();
  return url;
};
