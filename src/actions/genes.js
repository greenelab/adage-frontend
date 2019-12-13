import { createAction } from 'redux-actions';
import { createFetchAction } from './fetch.js';

import { urlGeneSearch } from '../backend/genes.js';
import { urlGeneDetails } from '../backend/genes.js';

export const getGeneSearch = createFetchAction(
  'GET_GENE_SEARCH',
  urlGeneSearch
);

export const clearGeneSearch = createAction('CLEAR_GENE_SEARCH');

export const getGeneDetails = createFetchAction(
  'GET_GENE_DETAILS',
  urlGeneDetails
);

export const selectGene = createAction('SELECT_GENE');

export const deselectGene = createAction('DESELECT_GENE');

export const deselectAllGenes = createAction('DESELECT_ALL_GENES');

export const toggleSelectGene = createAction('TOGGLE_SELECT_GENE');

export const selectFirstGenes = createAction('SELECT_FIRST_GENES');

export const deselectFirstGenes = createAction('DESELECT_FIRST_GENES');
