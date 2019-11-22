import produce from 'immer';

const reducer = produce((draft, action) => {
  console.log('REDUCER', action);

  if (!action)
    return;

  switch (action.type) {
    case 'SET_MODELS_SUCCEEDED':
      draft.models = action.payload;
      draft.models[0].selected = true;
      break;

    case 'SET_MODELS_FAILED':
      draft.models = null;
      break;

    case 'SET_SELECTED_MODEL':
      if (!draft.models)
        break;
      draft.models.forEach((model) => (model.selected = false));
      draft.models[action.payload].selected = true;
      break;

    default:
      break;
  }
});

export default reducer;

export const getModelList = (state) => {
  if (!Array.isArray(state.models))
    return { models: null };
  return {
    models: state.models.map((model) => ({
      id: model.id,
      selected: model.selected,
      title: model.title,
      authors: model.authors.split('\n'),
      journal: model.journal,
      year: model.year
    }))
  };
};

export const getModelDetails = (state, ownProps) => {
  if (!Array.isArray(state.models) || !state.models.length)
    return {};
  else {
    return {
      details: state.models.find(
        (model) => String(model.id) === String(ownProps.match.params.id)
      )
    };
  }
};
