import produce from 'immer';

import { reduceQuery } from './query.js';

const reducer = produce((draft, action) => {
  const { type = '', payload = {} } = action;

  if (!Array.isArray(draft.selectedGenes))
    draft.selectedGenes = [];

  switch (type) {
    case 'SEARCH_GENES_STARTED':
    case 'SEARCH_GENES_SUCCEEDED':
    case 'SEARCH_GENES_FAILED':
      draft.geneResults = reduceQuery(action);
      break;

    case 'SELECT_GENE':
      draft.selectedGenes.push(payload.gene);
      break;

    case 'DESELECT_GENE':
      const index = draft.selectedGenes.findIndex(
        (selectedGene) => selectedGene.id === payload.id
      );
      if (index >= 0)
        draft.selectedGenes.splice(index, 1);
      break;

    default:
      break;
  }
});

export default reducer;
