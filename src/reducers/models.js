import produce from 'immer';

import { reduceQuery } from './query.js';

const reducer = produce((draft, action) => {
  const { type = '', payload = {} } = action;

  switch (type) {
    case 'SET_MODELS_STARTED':
    case 'SET_MODELS_SUCCEEDED':
    case 'SET_MODELS_FAILED':
      draft.models = reduceQuery(action);
      break;

    case 'SET_SELECTED_MODEL':
      if (!Array.isArray(draft.models) || !draft.models.length)
        break;
      draft.models.forEach((model) => (model.selected = false));
      const index = draft.models.findIndex((model) => model.id === payload.id);
      if (index >= 0)
        draft.models[index].selected = true;
      else
        draft.models[0].selected = true;
      break;

    default:
      break;
  }
});

export default reducer;
