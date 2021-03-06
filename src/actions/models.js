import { createAction } from './';
import { createFetchAction } from './fetch';

import { urlModelList } from '../backend/models';

// actions related to "model" sub-object of state

// get full list of all models
export const getModelList = createFetchAction('GET_MODEL_LIST', urlModelList);

// select model based on id
export const selectModel = createAction('SELECT_MODEL');
