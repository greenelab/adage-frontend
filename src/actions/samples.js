import { createAction } from 'redux-actions';
import { createFetchAction } from './fetch';

import { urlSampleDetails } from '../backend/samples';
import { urlSampleList } from '../backend/samples';

// actions related to the "sample" sub-object of the state

// get full details of viewed sample (on sample details page)
export const getSampleDetails = createFetchAction(
  'GET_SAMPLE_DETAILS',
  urlSampleDetails
);

// get full list of all samples
export const getSampleList = createFetchAction(
  'GET_SAMPLE_LIST',
  urlSampleList
);

// place sample (id) in specified group (index)
export const groupSample = createAction('GROUP_SAMPLE');

// remove sample (id) from all groups
export const ungroupSample = createAction('UNGROUP_SAMPLE');

// remove all samples from groups
export const ungroupAllSamples = createAction('UNGROUP_ALL_SAMPLES');
