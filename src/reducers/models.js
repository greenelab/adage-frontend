import produce from 'immer';

import { reduceQuery } from './query.js';

const reducer = produce((draft, action) => {
  switch (action.type) {
    case 'SET_MODELS_STARTED':
    case 'SET_MODELS_SUCCEEDED':
    case 'SET_MODELS_FAILED':
      draft.models = reduceQuery(action);
      break;

    case 'SET_SELECTED_MODEL':
      if (!Array.isArray(draft.models) || !draft.models.length)
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
  if (Array.isArray(state.models)) {
    return {
      models: state.models.map((model = {}) => ({
        id: model.id,
        selected: model.selected,
        title: model.title,
        authors: (model.authors || '').split('\n'),
        journal: model.journal,
        year: model.year
      }))
    };
  } else
    return { models: state.models };
};

export const getModelDetails = (state, ownProps) => {
  if (Array.isArray(state.models)) {
    return {
      details: state.models.find(
        (model) => String(model.id) === String(ownProps.match.params.id)
      )
    };
  } else
    return {};
};
