import { server } from '.';
import { defaultLimit } from '.';

// functions to generate urls to fetch sample-related data from

const prefixA = 'sample/';
const prefixB = 'activity/';

export const urlSampleList = ({ limit = defaultLimit }) => {
  const params = new URLSearchParams();
  params.set('limit', limit);

  const url = server + prefixA + '?' + params.toString();
  return url;
};

export const urlSampleActivities = ({
  modelId,
  sampleIds,
  limit = defaultLimit
}) => {
  const params = new URLSearchParams();
  params.set('limit', limit);
  if (modelId)
    params.set('mlmodel', modelId);
  if (sampleIds)
    params.set('samples', sampleIds.join(','));

  const url = server + prefixB + '?' + params.toString();
  return url;
};
