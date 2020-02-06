import { createAction } from 'redux-actions';
import { createFetchAction } from './fetch';

import { urlExperimentDetails } from '../backend/experiments';
import { urlExperimentList } from '../backend/experiments';
import { urlExperimentSearch } from '../backend/experiments';

export const getExperimentDetails = createFetchAction(
  'GET_EXPERIMENT_DETAILS',
  urlExperimentDetails
);

export const getExperimentList = createFetchAction(
  'GET_EXPERIMENT_LIST',
  urlExperimentList
);

export const getExperimentSearch = createFetchAction(
  'GET_EXPERIMENT_SEARCH',
  urlExperimentSearch
);

export const selectExperiment = createAction('SELECT_EXPERIMENT');

export const getExperimentSelectedDetails = createAction(
  'GET_EXPERIMENT_SELECTED_DETAILS'
);
