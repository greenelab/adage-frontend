import produce from 'immer';

import { reduceQuery } from './query.js';

const reducer = produce((draft, action) => {
  switch (action.type) {
    case 'SEARCH_GENES_STARTED':
    case 'SEARCH_GENES_SUCCEEDED':
    case 'SEARCH_GENES_FAILED':
      draft.geneResults = reduceQuery(action);
      break;

    default:
      break;
  }
});

export default reducer;

export const getGeneResults = (state) => {
  if (Array.isArray(state.geneResults)) {
    return {
      genes: state.geneResults.map((gene) => ({
        standard_name: gene.standard_name,
        systematic_name: gene.systematic_name,
        entrezid: gene.entrezid,
        description: gene.description
      }))
    };
  } else
    return { genes: state.geneResults };
};
