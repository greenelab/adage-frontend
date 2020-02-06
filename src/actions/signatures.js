import { createAction } from 'redux-actions';
import { createFetchAction } from './fetch';

import { urlSignatureDetails } from '../backend/signatures';
import { urlSignatureList } from '../backend/signatures';

export const getSignatureDetails = createFetchAction(
  'GET_SIGNATURE_DETAILS',
  urlSignatureDetails
);

export const getSignatureList = createFetchAction(
  'GET_SIGNATURE_LIST',
  urlSignatureList
);

export const setSelectedSignature = createAction('SET_SELECTED_SIGNATURE');
