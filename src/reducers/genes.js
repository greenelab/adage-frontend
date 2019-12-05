import produce from 'immer';

import { isString } from '../util/types.js';
import { isArray } from '../util/types.js';
import { isObject } from '../util/types.js';

const reducer = produce((draft, type, payload, meta) => {
  const typeCheck = () => {
    if (!isString(draft.details) && !isObject(draft.details))
      draft.details = '';
    if (!isArray(draft.searches))
      draft.searches = [];
    if (!isString(draft.selected) && !isArray(draft.selected))
      draft.selected = [];
  };

  typeCheck();

  switch (type) {
    case 'GET_GENE_DETAILS':
      draft.details = payload;
      break;

    case 'GET_GENE_SEARCH':
      if (!isObject(draft.searches[meta.index]))
        draft.searches[meta.index] = {};
      draft.searches[meta.index].string = meta.string;
      draft.searches[meta.index].results = payload;
      break;

    case 'CLEAR_GENE_SEARCH':
      draft.searches = [];
      break;

    case 'SELECT_GENE':
      if (!draft.selected.includes(payload.id))
        draft.selected.push(payload.id);
      break;

    case 'DESELECT_GENE':
      const index = draft.selected.findIndex(
        (selected) => selected === payload.id
      );
      if (index >= 0)
        draft.selected.splice(index, 1);
      break;

    default:
      break;
  }

  typeCheck();
}, {});

export default reducer;
