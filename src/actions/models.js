import { createActionThunk } from 'redux-thunk-actions';

import fetchModels from '../fetch/models.js';

const setModels = createActionThunk('SET_MODELS', fetchModels, true);

export default setModels;
