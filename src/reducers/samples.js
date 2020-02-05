import produce from 'immer';

import { isString } from '../util/types.js';
import { isObject } from '../util/types.js';

const typeCheck = (draft) => {
  if (!isString(draft.details) && !isObject(draft.details))
    draft.details = {};
};

const reducer = produce((draft, type, payload, meta) => {
  typeCheck(draft);

  switch (type) {
    case 'GET_SAMPLE_DETAILS':
      draft.details = payload;
      break;

    default:
      break;
  }

  typeCheck(draft);
}, {});

export default reducer;
