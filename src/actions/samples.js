import { createAction } from './';
import { createFetchAction } from './fetch';

import { urlSampleDetails } from '../backend/samples';
import { urlSampleList } from '../backend/samples';
import { urlSampleActivities } from '../backend/samples';

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

// select samples based on experiment id
export const selectSamples = createAction('SELECT_SAMPLES');

// fill in remaining details of selected samples
export const getSampleSelectedDetails = createAction(
  'GET_SAMPLE_SELECTED_DETAILS'
);

// get activities for specified samples
export const getSampleActivities = createFetchAction(
  'GET_SAMPLE_ACTIVITIES',
  urlSampleActivities
);

// calculate volcano plot data based on sample groups and set it in state
export const setVolcano = createAction('SET_VOLCANO');
