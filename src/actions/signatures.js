import { createAction } from 'redux-actions';
import { createFetchAction } from './fetch.js';

import { urlSignatureList } from '../backend/signatures.js';
import { urlSignatureDetails } from '../backend/signatures.js';

export const getSignatureList = createFetchAction(
  'GET_SIGNATURE_LIST',
  urlSignatureList
);

export const getSignatureDetails = createFetchAction(
  'GET_SIGNATURE_DETAILS',
  urlSignatureDetails
);

export const setSelectedSignature = createAction('SET_SELECTED_SIGNATURE');
