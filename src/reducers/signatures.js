import produce from 'immer';

import { isString } from '../util/types';
import { isArray } from '../util/types';
import { isObject } from '../util/types';
import { split } from '../util/string';
import { includes } from '../util/object';
import { actionStatuses } from '../actions/fetch';

// type check for key variables, run before and after reducer
const typeCheck = (draft) => {
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
    case 'GET_SIGNATURE_LIST': {
      draft.list = payload;
      break;
    }

    case 'GET_SIGNATURE_SEARCH': {
      if (!isObject(draft.searches[meta.index]))
        draft.searches[meta.index] = {};
      let results;
      if (isArray(draft.list)) {
        results = draft.list.filter((signature) =>
          includes(signature.name.toLowerCase(), split(meta.query)));
        if (!results.length)
          results = actionStatuses.EMPTY;
      } else
        results = actionStatuses.LOADING;
      draft.searches[meta.index].results = results;
      break;
    }

    case 'SELECT_SIGNATURE': {
      draft.selected = payload;
      break;
    }

    case 'SELECT_SIGNATURE_FROM_URL': {
      if (!payload.id)
        draft.selected = {};
      else
        draft.selected = { id: payload.id };
      break;
    }

    case 'GET_SIGNATURE_PARTICIPATIONS': {
      draft.participations = payload;
      break;
    }

    case 'GET_SIGNATURE_ACTIVITIES': {
      draft.activities = payload;
      break;
    }

    default: {
      break;
    }
  }

  // fill in details of selected from full list
  if (isArray(draft.list)) {
    const found = draft.list.find(
      (signature) => signature.id === draft.selected.id
    );
    if (found && !signatureIsLoaded(draft.selected))
      draft.selected = found;
  }

  typeCheck(draft);
}, {});

export default reducer;

export const isSelected = (selected, id) => selected.id === id;

export const signatureIsLoaded = (signature) =>
  signature?.name ? true : false;
