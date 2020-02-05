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
    case 'GET_MODEL_DETAILS':
      draft.details = payload;
      break;

    case 'GET_MODEL_LIST':
      draft.list = payload;
      break;

    case 'SET_SELECTED_MODEL':
      if (payload.id)
        draft.selected = payload.id;
      else if (!draft.selected && isArray(draft.list) && draft.list.length)
        draft.selected = draft.list[0].id;
      break;

    case 'SELECT_MODEL_FROM_URL':
      if (payload.id)
        draft.selected = payload.id;
      else if (!draft.selected && isArray(draft.list) && draft.list.length)
        draft.selected = draft.list[0].id;
      break;

    default:
      break;
  }

  typeCheck(draft);
}, {});

export default reducer;
