import { createFetchAction } from './fetch';

import { urlSampleDetails } from '../backend/samples';

export const getSampleDetails = createFetchAction(
  'GET_SAMPLE_DETAILS',
  urlSampleDetails
);
