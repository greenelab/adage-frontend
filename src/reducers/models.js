import produce from 'immer';

import { reduceQuery } from './query.js';

const reducer = produce((draft, type, payload) => {
  switch (type) {
    case 'GET_MODEL_DETAILS_STARTED':
    case 'GET_MODEL_DETAILS_SUCCEEDED':
    case 'GET_MODEL_DETAILS_FAILED':
      draft.details = reduceQuery(type, payload);
      break;

    case 'GET_MODEL_LIST_STARTED':
    case 'GET_MODEL_LIST_SUCCEEDED':
    case 'GET_MODEL_LIST_FAILED':
      draft.list = reduceQuery(type, payload);
      break;

    case 'SET_SELECTED_MODEL':
      if (payload.id)
        draft.selected = payload.id;
      if (!draft.selected && Array.isArray(draft.list) && draft.list.length)
        draft.selected = draft.list[0].id;
      break;

    default:
      break;
  }
}, {});

export default reducer;
