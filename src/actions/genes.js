import { createAction } from 'redux-actions';
import { createFetchAction } from './fetch';

import { urlGeneDetails } from '../backend/genes';
import { urlGeneList } from '../backend/genes';
import { urlGeneSearch } from '../backend/genes';
import { urlGeneEnrichedSignatures } from '../backend/genes';
import { urlGeneEdges } from '../backend/genes';

// actions related to "gene" sub-object of state

// get full details of viewed gene (on gene details page)
export const getGeneDetails = createFetchAction(
  'GET_GENE_DETAILS',
  urlGeneDetails
);

// get full list of all genes
export const getGeneList = createFetchAction('GET_GENE_LIST', urlGeneList);

// search for genes based on query
export const getGeneSearch = createFetchAction(
  'GET_GENE_SEARCH',
  urlGeneSearch
);

// clear all gene searches
export const clearGeneSearch = createAction('CLEAR_GENE_SEARCH');

// select gene based on id
export const selectGene = createAction('SELECT_GENE');

// deselect gene based on id
export const deselectGene = createAction('DESELECT_GENE');

// deselect all genes
export const deselectAllGenes = createAction('DESELECT_ALL_GENES');

// select first gene of each search results
export const selectFirstGenes = createAction('SELECT_FIRST_GENES');

// deselect first gene of each search results
export const deselectFirstGenes = createAction('DESELECT_FIRST_GENES');

// fill in remaining details of selected experiments
export const getGeneSelectedDetails = createAction('GET_GENE_SELECTED_DETAILS');

// get gene participations and calculate enriched signatures
export const getGeneEnrichedSignatures = createFetchAction(
  'GET_GENE_ENRICHED_SIGNATURES',
  urlGeneEnrichedSignatures
);

// get edges to create network
export const getGeneEdges = createFetchAction('GET_GENE_EDGES', urlGeneEdges);
