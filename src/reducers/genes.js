import produce from 'immer';

import { reduceQuery } from './query.js';

const reducer = produce((draft, type, payload) => {
  if (!Array.isArray(draft.selected))
    draft.selected = [];

  switch (type) {
    case 'GET_GENE_DETAILS_STARTED':
    case 'GET_GENE_DETAILS_SUCCEEDED':
    case 'GET_GENE_DETAILS_FAILED':
      draft.details = reduceQuery(type, payload);
      break;

    case 'SEARCH_GENES_STARTED':
    case 'SEARCH_GENES_SUCCEEDED':
    case 'SEARCH_GENES_FAILED':
      draft.results = reduceQuery(type, payload);
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
}, {});

export default reducer;
