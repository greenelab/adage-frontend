import { createAction } from './';
import { createFetchAction } from './fetch';

import { urlGeneList } from '../backend/genes';
import { urlGeneSearch } from '../backend/genes';
import { urlGeneParticipations } from '../backend/genes';
import { urlGeneEdges } from '../backend/genes';

// actions related to "gene" sub-object of state

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

// get gene participations
export const getGeneParticipations = createFetchAction(
  'GET_GENE_PARTICIPATIONS',
  urlGeneParticipations
);

// calculate enriched signatures and set them
export const setEnrichedSignatures = createAction('SET_ENRICHED_SIGNATURES');

// get edges to create network
export const getGeneEdges = createFetchAction('GET_GENE_EDGES', urlGeneEdges);
