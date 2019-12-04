import produce from 'immer';

const reducer = produce((draft, type, payload, meta) => {
  if (!Array.isArray(draft.searches))
    draft.searches = [];
  if (!Array.isArray(draft.selected))
    draft.selected = [];

  switch (type) {
    case 'GET_GENE_DETAILS':
      draft.details = payload;
      break;

    case 'GET_GENE_SEARCH':
      if (Array.isArray(payload))
        payload.forEach((result) => (result.search = meta.search));
      draft.searches[meta.index] = payload;
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
