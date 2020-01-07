import models from './models.js';
import genes from './genes.js';
import signatures from './signatures.js';

const reducer = (state = {}, action = {}) => {
  const { type = '', payload = {}, meta = {} } = action;
  return {
    model: models(state.model, type, payload, meta),
    gene: genes(state.gene, type, payload, meta),
    signature: signatures(state.signature, type, payload, meta)
  };
};

export default reducer;
