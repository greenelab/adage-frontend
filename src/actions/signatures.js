import { createAction } from './';
import { createFetchAction } from './fetch';

import { urlSignatureList } from '../backend/signatures';
import { urlSignatureParticipations } from '../backend/signatures';
import { urlSignatureActivities } from '../backend/signatures';
import { urlPickledGenes } from '../backend/signatures';

// actions related to the "signature" sub-object of the state

// get full list of all signatures
export const getSignatureList = createFetchAction(
  'GET_SIGNATURE_LIST',
  urlSignatureList
);

// search for signature based on query
export const getSignatureSearch = createAction('GET_SIGNATURE_SEARCH');

// select signature based on id
export const selectSignature = createAction('SELECT_SIGNATURE');

// get signature participations
export const getSignatureParticipations = createFetchAction(
  'GET_SIGNATURE_PARTICIPATIONS',
  urlSignatureParticipations
);

// get activities for specified signatures
export const getSignatureActivities = createFetchAction(
  'GET_SIGNATURE_ACTIVITIES',
  urlSignatureActivities
);

// get pickled gene sets given organism taxon id
export const getPickledGenes = createFetchAction(
  'GET_PICKLED_GENES',
  urlPickledGenes
);

// calculate enriched gene sets and set them
export const setEnrichedGenes = createAction('SET_ENRICHED_GENES');
