import produce from 'immer';

import { isObject } from '../util/types';
import { isString } from '../util/types';
import { isArray } from '../util/types';

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
    case 'GET_ORGANISM_LIST': {
      draft.list = payload;
      break;
    }

    case 'SELECT_ORGANISM': {
      draft.selected = payload;
      break;
    }

    default: {
      break;
    }
  }

  // fill in details of selected from full list
  if (isArray(draft.list)) {
    const found = draft.list.find(
      (organism) => organism.id === draft.selected.id
    );
    if (found && !organismIsLoaded(draft.selected))
      draft.selected = found;
  }

  typeCheck(draft);
}, {});

export default reducer;

export const organismIsLoaded = (organism) => (organism?.title ? true : false);
