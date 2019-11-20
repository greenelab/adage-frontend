import produce from 'immer';

const models = produce((draft, action) => {
  switch (action.type) {
    case 'SET_MODELS_SUCCEEDED':
      return action.payload;

    default:
      return draft.models;
  }
});

export default models;
