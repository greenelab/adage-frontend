import produce from 'immer';

import { isString } from '../util/types.js';
import { isArray } from '../util/types.js';
import { isObject } from '../util/types.js';

const typeCheck = (draft) => {
  if (!isString(draft.details) && !isObject(draft.details))
    draft.details = {};
  if (!isString(draft.list) && !isArray(draft.list))
    draft.list = [];
  if (!isArray(draft.searches))
    draft.searches = [];
  if (!isObject(draft.selected))
    draft.selected = {};
};

const reducer = produce((draft, type, payload, meta) => {
  typeCheck(draft);

  switch (type) {
    case 'GET_EXPERIMENT_DETAILS':
      draft.details = payload;
      break;

    case 'GET_EXPERIMENT_LIST':
      draft.list = payload;
      break;

    case 'GET_EXPERIMENT_SEARCH':
      if (!isObject(draft.searches[meta.index]))
        draft.searches[meta.index] = {};
      draft.searches[meta.index].query = meta.query;
      draft.searches[meta.index].results = payload;
      break;

    case 'SELECT_EXPERIMENT':
      draft.selected = payload;
      break;

    case 'GET_EXPERIMENT_SELECTED_DETAILS':
      if (!isArray(draft.list) || !draft.list.length)
        break;
      draft.selected = draft.list.find(
        (experiment) => experiment.accession === draft.selected.accession
      );
      break;

    default:
      break;
  }

  typeCheck(draft);
}, {});

export default reducer;

export const isSelected = (result, state) =>
  result?.accession &&
  state?.experiment?.selected?.accession &&
  result.accession === state.experiment.selected.accession;
