import { createAction } from 'redux-actions';
import { createActionThunk } from '../util/thunk-actions.js';

import { fetchModelList } from '../backend/models.js';
import { fetchModelDetails } from '../backend/models.js';

export const getModelList = createActionThunk('GET_MODEL_LIST', fetchModelList);

export const getModelDetails = createActionThunk(
  'GET_MODEL_DETAILS',
  fetchModelDetails
);

export const setSelectedModel = createAction('SET_SELECTED_MODEL');
