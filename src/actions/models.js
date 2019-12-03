import { createAction } from 'redux-actions';
import { createActionThunk } from 'redux-thunk-actions';

import { fetchModels } from '../backend/models.js';
import { fetchModel } from '../backend/models.js';

export const getModelList = createActionThunk(
  'GET_MODEL_LIST',
  fetchModels,
  true
);

export const getModelDetails = createActionThunk(
  'GET_MODEL_DETAILS',
  fetchModel,
  true
);

export const setSelectedModel = createAction('SET_SELECTED_MODEL');
