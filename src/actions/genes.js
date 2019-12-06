import { createAction } from 'redux-actions';
import { createActionThunk } from '../util/thunk-actions.js';

import { fetchGeneSearch } from '../backend/genes.js';
import { fetchGeneDetails } from '../backend/genes.js';

export const getGeneSearch = createActionThunk(
  'GET_GENE_SEARCH',
  fetchGeneSearch
);

export const clearGeneSearch = createAction('CLEAR_GENE_SEARCH');

export const getGeneDetails = createActionThunk(
  'GET_GENE_DETAILS',
  fetchGeneDetails
);

export const selectGene = createAction('SELECT_GENE');

export const deselectGene = createAction('DESELECT_GENE');

export const toggleSelectGene = createAction('TOGGLE_SELECT_GENE');

export const selectFirstGenes = createAction('SELECT_FIRST_GENES');

export const deselectFirstGenes = createAction('DESELECT_FIRST_GENES');
