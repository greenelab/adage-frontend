import { createAction } from 'redux-actions';
import { createFetchAction } from './fetch';

import { urlSignatureDetails } from '../backend/signatures';
import { urlSignatureList } from '../backend/signatures';

// actions related to the "signature" sub-object of the state

// get full details of viewed signature (on signature details page)
export const getSignatureDetails = createFetchAction(
  'GET_SIGNATURE_DETAILS',
  urlSignatureDetails
);

// get full list of all signatures
export const getSignatureList = createFetchAction(
  'GET_SIGNATURE_LIST',
  urlSignatureList
);

// select signature based on id
export const selectSignature = createAction('SELECT_SIGNATURE');
