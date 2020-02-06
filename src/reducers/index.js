import models from './models';
import genes from './genes';
import experiments from './experiments';
import samples from './samples';
import signatures from './signatures';

// master reducer
// split into sub-reducers that handle one specific slice of state each

const reducer = (state = {}, action = {}) => {
  const { type = '', payload = {}, meta = {} } = action;
  return {
    model: models(state.model, type, payload, meta),
    gene: genes(state.gene, type, payload, meta),
    experiment: experiments(state.experiment, type, payload, meta),
    sample: samples(state.sample, type, payload, meta),
    signature: signatures(state.signature, type, payload, meta)
  };
};

export default reducer;
