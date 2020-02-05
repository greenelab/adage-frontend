import { createFetchAction } from './fetch.js';

import { urlSampleDetails } from '../backend/samples.js';

export const getSampleDetails = createFetchAction(
  'GET_SAMPLE_DETAILS',
  urlSampleDetails
);
