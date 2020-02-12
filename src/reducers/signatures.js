import produce from 'immer';

import { isString } from '../util/types';
import { isArray } from '../util/types';
import { isObject } from '../util/types';
import { normalize } from '../util/object';
import { mapFetchPayload } from '.';

// type check for key variables, run before and after reducer
const typeCheck = (draft) => {
  if (!isString(draft.details) && !isObject(draft.details))
    draft.details = {};
  if (!isString(draft.list) && !isArray(draft.list))
    draft.list = [];
};

// defines how state (redux store) changes in response to dispatched actions
const reducer = produce((draft, type, payload, meta) => {
  typeCheck(draft);

  switch (type) {
    case 'GET_SIGNATURE_DETAILS':
      draft.details = mapFetchPayload(payload, normalize);
      break;

    case 'GET_SIGNATURE_LIST':
      draft.list = mapFetchPayload(payload, normalize);
      break;

    default:
      break;
  }

  typeCheck(draft);
}, {});

export default reducer;
