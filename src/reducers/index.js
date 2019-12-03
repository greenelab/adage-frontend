import models from './models.js';
import genes from './genes.js';

const reducer = (state = {}, action = {}) => {
  const { type = '', payload = {} } = action;
  return {
    models: models(state.models, type, payload),
    genes: genes(state.genes, type, payload)
  };
};

export default reducer;
