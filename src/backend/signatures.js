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

// tribe deprecated. switch to mygeneset.info once it has pseudomonas.
// export const urlPickledGenes = ({ organism }) => {
//   const params = new URLSearchParams();
//   if (organism)
//     params.set('organism', organism);

//   const url = '' + '?' + params.toString();
//   return url;
// };
