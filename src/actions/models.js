import { createAction } from 'redux-actions';
import { createActionThunk } from 'redux-thunk-actions';

import { fetchModels } from '../backend/models.js';

export const setModels = createActionThunk('SET_MODELS', fetchModels, true);

export const setSelectedModel = createAction('SET_SELECTED_MODEL');
