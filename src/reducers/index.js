import models from './models.js';
import genes from './genes.js';

const reducer = (state = {}, action = {}) => {
  const { type = '', payload = {}, meta = {} } = action;
  return {
    model: models(state.model, type, payload, meta),
    gene: genes(state.gene, type, payload, meta)
  };
};

export default reducer;
