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
  if (!isArray(draft.selected))
    draft.selected = [];
  if (!isArray(draft.groups))
    draft.groups = [];
  if (!isString(draft.activities) && !isArray(draft.activities))
    draft.activities = actionStatuses.EMPTY;
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

    case 'UNGROUP_ALL_SAMPLES':
      draft.groups = [];
      break;

    case 'GET_ACTIVITIES':
      draft.activities = payload;
      break;

    default:
      break;
  }

  typeCheck(draft);
}, {});

export default reducer;

export const isGrouped = (groups, id) => {
  for (const [index, group] of Object.entries(groups)) {
    if (group.includes(id))
      return Number(index);
  }

  return -1;
};

export const filterGrouped = (groups, id) =>
  groups.map((group) =>
    isArray(group) ? group.filter((sample) => sample !== id) : []
  );
