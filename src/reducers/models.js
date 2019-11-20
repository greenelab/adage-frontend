import produce from 'immer';

const models = produce((draft, action) => {
  switch (action.type) {
    case 'SET_MODELS_SUCCEEDED':
      draft.models = action.payload;
      draft.models[0].selected = true;
      break;

    case 'SET_MODELS_FAILED':
      draft.models = null;
      break;

    case 'SET_SELECTED_MODEL':
      draft.models.forEach((model) => (model.selected = false));
      draft.models[action.payload].selected = true;
      break;

    default:
      break;
  }
});

export default models;

export const getModelList = (state) => {
  if (!Array.isArray(state.models))
    return { models: null };
  return {
    models: state.models.map((model) => ({
      selected: model.selected,
      title: model.title,
      authors: model.authors.split('\n'),
      publisher: model.publisher,
      year: model.year
    }))
  };
};
