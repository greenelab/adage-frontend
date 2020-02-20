import { createAction } from './';
import { createFetchAction } from './fetch';

import { urlExperimentDetails } from '../backend/experiments';
import { urlExperimentList } from '../backend/experiments';
import { urlExperimentSearch } from '../backend/experiments';

// actions related to "experiment" sub-object of state

// get full details of viewed experiment (on experiment details page)
export const getExperimentDetails = createFetchAction(
  'GET_EXPERIMENT_DETAILS',
  urlExperimentDetails
);

// get full list of all experiments
export const getExperimentList = createFetchAction(
  'GET_EXPERIMENT_LIST',
  urlExperimentList
);

// search for experiments based on query
export const getExperimentSearch = createFetchAction(
  'GET_EXPERIMENT_SEARCH',
  urlExperimentSearch
);

// select experiment based on id
export const selectExperiment = createAction('SELECT_EXPERIMENT');

// fill in remaining details of selected experiments
export const getExperimentSelectedDetails = createAction(
  'GET_EXPERIMENT_SELECTED_DETAILS'
);
