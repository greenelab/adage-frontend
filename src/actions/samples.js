import { createAction } from 'redux-actions';
import { createFetchAction } from './fetch';

import { urlSampleDetails } from '../backend/samples';

// actions related to the "sample" sub-object of the state

// get full details of viewed sample (on sample details page)
export const getSampleDetails = createFetchAction(
  'GET_SAMPLE_DETAILS',
  urlSampleDetails
);

// place sample (id) in specified group (index)
export const groupSample = createAction('GROUP_SAMPLE');

// remove sample (id) from all groups
export const ungroupSample = createAction('UNGROUP_SAMPLE');

// remove all samples from groups
export const ungroupAllSamples = createAction('UNGROUP_ALL_SAMPLES');
