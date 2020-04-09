import models from './models';
import organisms from './organisms';
import genes from './genes';
import experiments from './experiments';
import samples from './samples';
import signatures from './signatures';

// master reducer
// split into sub-reducers that handle one specific slice of state each

const reducer = (state = {}, action = {}) => {
  const { type = '', payload = {}, meta = {} } = action;

  return {
    models: models(state.models, type, payload, meta),
    organisms: organisms(state.organisms, type, payload, meta),
    genes: genes(state.genes, type, payload, meta),
    experiments: experiments(state.experiments, type, payload, meta),
    samples: samples(state.samples, type, payload, meta),
    signatures: signatures(state.signatures, type, payload, meta)
  };
};

export default reducer;
