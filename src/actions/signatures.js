import { createAction } from './';
import { createFetchAction } from './fetch';

import { urlSignatureList } from '../backend/signatures';
import { urlSignatureParticipations } from '../backend/signatures';
import { urlSignatureActivities } from '../backend/signatures';
import { urlEnrichedGenes } from '../backend/signatures';

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

// get pickled genes from tribe given organism
export const getEnrichedGenes = createFetchAction(
  'GET_ENRICHED_GENES',
  urlEnrichedGenes
);
