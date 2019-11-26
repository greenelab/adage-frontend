import produce from 'immer';

const reducer = produce((draft, action) => {
  switch (action.type) {
    case 'SEARCH_GENES_STARTED':
      draft.geneResults = 'loading';
      break;

    case 'SEARCH_GENES_SUCCEEDED':
      if (Array.isArray(action.payload)) {
        if (action.payload.length)
          draft.geneResults = action.payload;
        else
          draft.geneResults = 'empty';
      } else
        draft.geneResults = 'error';

      break;

    case 'SEARCH_GENES_FAILED':
      draft.geneResults = 'error';
      break;

    default:
      break;
  }
});

export default reducer;

export const getGeneResults = (state) => {
  if (!Array.isArray(state.geneResults))
    return { genes: state.geneResults };
  return {
    genes: state.geneResults.map((gene) => ({
      standard_name: gene.standard_name,
      systematic_name: gene.systematic_name,
      entrezid: gene.entrezid,
      description: gene.description
    }))
  };
};
