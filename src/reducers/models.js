import produce from 'immer';

import { isString } from '../util/types';
import { isArray } from '../util/types';
import { isObject } from '../util/types';

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
    case 'GET_MODEL_DETAILS': {
      draft.details = payload;
      break;
    }

    case 'GET_MODEL_LIST': {
      draft.list = payload;
      break;
    }

    case 'SELECT_MODEL': {
      if (payload.id)
        draft.selected = payload.id;
      else if (!draft.selected && isArray(draft.list) && draft.list.length)
        draft.selected = draft.list[0].id;
      break;
    }

    case 'SELECT_MODEL_FROM_URL': {
      if (payload.id)
        draft.selected = payload.id;
      else if (!draft.selected && isArray(draft.list) && draft.list.length)
        draft.selected = draft.list[0].id;
      break;
    }

    default: {
      break;
    }
  }

  typeCheck(draft);
}, {});

export default reducer;
