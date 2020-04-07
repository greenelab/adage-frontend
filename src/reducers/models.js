import produce from 'immer';

import { isString } from '../util/types';
import { isArray } from '../util/types';
import { isObject } from '../util/types';

// type check for key variables, run before and after reducer
const typeCheck = (draft) => {
  if (!isString(draft.list) && !isArray(draft.list))
    draft.list = [];
  if (!isObject(draft.selected))
    draft.selected = {};
};

// defines how state (redux store) changes in response to dispatched actions
const reducer = produce((draft, type, payload, meta) => {
  typeCheck(draft);

  switch (type) {
    case 'GET_MODEL_LIST': {
      draft.list = payload;
      break;
    }

    case 'SELECT_MODEL': {
      draft.selected = payload;
      break;
    }

    case 'SELECT_MODEL_FROM_URL': {
      if (!payload.id)
        draft.selected = {};
      else
        draft.selected = payload;
      break;
    }

    default: {
      break;
    }
  }

  // fill in details of selected from full list
  if (isArray(draft.list)) {
    const found = draft.list.find((model) => model.id === draft.selected.id);
    if (found && !modelIsLoaded(draft.selected))
      draft.selected = found;
  }

  typeCheck(draft);
}, {});

export default reducer;

export const modelIsLoaded = (model) => (model?.title ? true : false);
