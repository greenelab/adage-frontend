import produce from 'immer';

import { isString } from '../util/types.js';
import { isArray } from '../util/types.js';
import { isObject } from '../util/types.js';

const typeCheck = (draft) => {
  if (!isString(draft.details) && !isObject(draft.details))
    draft.details = {};
  if (!isString(draft.list) && !isArray(draft.list))
    draft.list = [];
};

const reducer = produce((draft, type, payload, meta) => {
  typeCheck(draft);

  switch (type) {
    case 'GET_SIGNATURE_DETAILS':
      draft.details = payload;
      break;

    case 'GET_SIGNATURE_LIST':
      draft.list = payload;
      break;

    default:
      break;
  }

  typeCheck(draft);
}, {});

export default reducer;
