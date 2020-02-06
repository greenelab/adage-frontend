import { createFetchAction } from './fetch';

import { urlSampleDetails } from '../backend/samples';

// actions related to the "sample" sub-object of the state

// get full details of viewed sample (on sample details page)
export const getSampleDetails = createFetchAction(
  'GET_SAMPLE_DETAILS',
  urlSampleDetails
);
