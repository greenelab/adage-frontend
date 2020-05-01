import { server } from '.';
import { maxLimit } from '.';

// functions to generate urls to fetch sample-related data from

const prefixA = 'sample/';
const prefixB = 'activity/';

export const urlSampleList = ({ limit = maxLimit }) => {
  const params = new URLSearchParams();
  params.set('limit', limit);

  const url = server + prefixA + '?' + params.toString();
  return url;
};

export const urlSampleActivities = ({
  model,
  samples,
  limit = maxLimit
}) => {
  const params = new URLSearchParams();
  params.set('limit', limit);
  if (model)
    params.set('mlmodel', model);
  if (samples)
    params.set('samples', samples.join(','));

  const url = server + prefixB + '?' + params.toString();
  return url;
};
