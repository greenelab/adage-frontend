import { createAction } from 'redux-actions';
import { createFetchAction } from './fetch.js';

import { urlModelDetails } from '../backend/models.js';
import { urlModelList } from '../backend/models.js';

export const getModelDetails = createFetchAction(
  'GET_MODEL_DETAILS',
  urlModelDetails
);

export const getModelList = createFetchAction('GET_MODEL_LIST', urlModelList);

export const setSelectedModel = createAction('SET_SELECTED_MODEL');
