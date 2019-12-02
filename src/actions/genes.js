import { createAction } from 'redux-actions';
import { createActionThunk } from 'redux-thunk-actions';

import { fetchGenes } from '../backend/genes.js';

export const searchGenes = createActionThunk('SEARCH_GENES', fetchGenes, true);

export const selectGene = createAction('SELECT_GENE');

export const deselectGene = createAction('DESELECT_GENE');
