import { createActionThunk } from 'redux-thunk-actions';

import fetchGenes from '../fetch/genes.js';

export const searchGenes = createActionThunk('SEARCH_GENES', fetchGenes, true);
