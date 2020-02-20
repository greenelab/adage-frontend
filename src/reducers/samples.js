import produce from 'immer';

import { isString } from '../util/types';
import { isArray } from '../util/types';
import { isObject } from '../util/types';
import { isEmpty } from '../util/types';
import { actionStatuses } from '../actions/fetch';

// type check for key variables, run before and after reducer
const typeCheck = (draft) => {
  if (!isString(draft.details) && !isObject(draft.details))
    draft.details = {};
  if (!isString(draft.list) && !isArray(draft.list))
    draft.list = [];
  if (!isArray(draft.selected))
    draft.selected = [];
  if (!isObject(draft.groups))
    draft.groups = {};
  if (!isString(draft.activities) && !isArray(draft.activities))
    draft.activities = actionStatuses.EMPTY;
  if (!isString(draft.volcano) && !isArray(draft.volcano))
    draft.volcano = actionStatuses.EMPTY;
};

// defines how state (redux store) changes in response to dispatched actions
const reducer = produce((draft, type, payload, meta) => {
  typeCheck(draft);

  switch (type) {
    case 'GET_SAMPLE_DETAILS':
      draft.details = payload;
      break;

    case 'GET_SAMPLE_LIST':
      draft.list = payload;
      break;

    case 'SELECT_SAMPLES':
      draft.selected = payload.ids.map((id) => ({ id }));
      break;

    case 'GET_SAMPLE_SELECTED_DETAILS':
      if (!isArray(draft.list) || !draft.list.length)
        break;
      draft.selected = draft.selected.map((selected) =>
        draft.list.find((sample) => sample.id === selected.id)
      );
      break;

    case 'UNGROUP_SAMPLE':
      draft.groups = filterGrouped(draft.groups, payload.id);
      break;

    case 'GROUP_SAMPLE':
      draft.groups = filterGrouped(draft.groups, payload.id);
      if (!isArray(draft.groups[payload.index]))
        draft.groups[payload.index] = [];
      draft.groups[payload.index].push(payload.id);
      break;

    case 'GROUP_SAMPLES_FROM_URL':
      if (
        !payload.index ||
        !payload.ids ||
        !isArray(payload.ids) ||
        !payload.ids.length
      )
        draft.groups[payload.index] = [];
      else
        draft.groups[payload.index] = payload.ids;
      break;

    case 'UNGROUP_ALL_SAMPLES':
      draft.groups = {};
      break;

    case 'GET_ACTIVITIES':
      draft.activities = payload;
      break;

    case 'SET_VOLCANO':
      if (isEmpty(payload))
        draft.volcano = actionStatuses.EMPTY;
      else
        draft.volcano = payload;
      break;

    default:
      break;
  }

  typeCheck(draft);
}, {});

export default reducer;

export const isGrouped = (groups, id) => {
  for (const [key, value] of Object.entries(groups)) {
    if (isArray(value) && value.includes(id))
      return key;
  }

  return -1;
};

export const filterGrouped = (groups, id) => {
  for (const [key, value] of Object.entries(groups)) {
    if (isArray(value))
      groups[key] = value.filter((sample) => sample !== id);
    else
      groups[key] = [];
  }
  return groups;
};
