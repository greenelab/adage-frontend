import produce from 'immer';

import { isString } from '../util/types';
import { isArray } from '../util/types';
import { isObject } from '../util/types';
import { actionStatuses } from '../actions/fetch';

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
  if (!isString(draft.participations) && !isArray(draft.participations))
    draft.participations = actionStatuses.EMPTY;
  if (!isString(draft.activities) && !isArray(draft.activities))
    draft.activities = actionStatuses.EMPTY;
};

// defines how state (redux store) changes in response to dispatched actions
const reducer = produce((draft, type, payload, meta) => {
  typeCheck(draft);

  switch (type) {
    case 'GET_SIGNATURE_DETAILS':
      draft.details = payload;
      break;

    case 'GET_SIGNATURE_LIST':
      draft.list = payload;
      break;

    case 'GET_SIGNATURE_SEARCH': {
      if (!isObject(draft.searches[meta.index]))
        draft.searches[meta.index] = {};
      draft.searches[meta.index].query = meta.query;

      let results;
      if (isArray(draft.list)) {
        results = draft.list.filter((signature) =>
          signature.name.includes(meta.query));
        if (!results.length)
          results = actionStatuses.EMPTY;
      } else
        results = actionStatuses.LOADING;

      draft.searches[meta.index].results = results.slice(0, 100);
      break;
    }

    case 'SELECT_SIGNATURE':
      draft.selected = payload;
      break;

    case 'SELECT_SIGNATURE_FROM_URL':
      if (!payload.id)
        draft.selected = {};
      else
        draft.selected = { id: payload.id };
      break;

    case 'GET_SIGNATURE_SELECTED_DETAILS':
      if (!isArray(draft.list) || !draft.list.length)
        break;

      draft.selected =
        draft.list.find((signature) => signature.id === draft.selected.id) ||
        {};
      break;

    case 'GET_SIGNATURE_PARTICIPATIONS':
      draft.participations = payload;
      break;

    case 'GET_SIGNATURE_ACTIVITIES':
      draft.activities = payload;
      break;

    default:
      break;
  }

  typeCheck(draft);
}, {});

export default reducer;

export const isSelected = (selected, id) => selected.id === id;
