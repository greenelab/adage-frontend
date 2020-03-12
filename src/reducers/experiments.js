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
  if (!isArray(draft.searches))
    draft.searches = [];
  if (!isObject(draft.selected))
    draft.selected = {};
};

// defines how state (redux store) changes in response to dispatched actions
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

    case 'SELECT_EXPERIMENTS_FROM_URL':
      if (!payload.accession)
        draft.selected = {};
      else
        draft.selected = { accession: payload.accession };
      break;

    case 'GET_EXPERIMENT_SELECTED_DETAILS':
      if (!isArray(draft.list) || !draft.list.length)
        break;

      draft.selected =
        draft.list.find(
          (experiment) => experiment.accession === draft.selected.accession
        ) || {};
      break;

    default:
      break;
  }

  typeCheck(draft);
}, {});

export default reducer;

export const isSelected = (selected, accession) =>
  selected.accession === accession;
