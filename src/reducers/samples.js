import produce from 'immer';

import { isString } from '../util/types';
import { isArray } from '../util/types';
import { isObject } from '../util/types';
import { normalize } from '../util/object';
import { mapFetchPayload } from '.';

// type check for key variables, run before and after reducer
const typeCheck = (draft) => {
  if (!isString(draft.details) && !isObject(draft.details))
    draft.details = {};
  if (!isString(draft.list) && !isArray(draft.list))
    draft.list = [];
  if (!isArray(draft.groups))
    draft.groups = [];
};

// defines how state (redux store) changes in response to dispatched actions
const reducer = produce((draft, type, payload, meta) => {
  typeCheck(draft);

  switch (type) {
    case 'GET_SAMPLE_DETAILS':
      draft.details = mapFetchPayload(payload, normalize);
      break;

    case 'GET_SAMPLE_LIST':
      draft.list = mapFetchPayload(payload, normalize);
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
