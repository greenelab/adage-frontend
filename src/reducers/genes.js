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
    if (!isArray(draft.selected))
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
      draft.searches[meta.index].query = meta.query;
      draft.searches[meta.index].results = payload;
      break;

    case 'CLEAR_GENE_SEARCH':
      draft.searches = [];
      break;

    case 'SELECT_GENE':
      if (!draft.selected.some((selected) => selected.id === payload.gene.id))
        draft.selected.push(payload.gene);
      break;

    case 'DESELECT_GENE':
      draft.selected = draft.selected.filter(
        (selected) => selected.id !== payload.gene.id
      );
      break;

    case 'DESELECT_ALL_GENES':
      draft.selected = [];
      break;

    case 'SELECT_FIRST_GENES':
      for (const search of draft.searches) {
        const firstResult =
          isArray(search.results) && search.results.length ?
            search.results[0] :
            null;
        if (
          firstResult &&
          !draft.selected.some((selected) => selected.id === firstResult.id)
        )
          draft.selected.push(firstResult);
      }
      break;

    case 'DESELECT_FIRST_GENES':
      for (const search of draft.searches) {
        const firstResult =
          isArray(search.results) && search.results.length ?
            search.results[0] :
            null;
        if (firstResult) {
          draft.selected = draft.selected.filter(
            (selected) => selected.id !== firstResult.id
          );
        }
      }
      break;

    default:
      break;
  }

  typeCheck();
}, {});

export default reducer;
