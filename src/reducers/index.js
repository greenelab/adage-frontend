import models from './models.js';

const reducer = (state = {}, action) => {
  return models(state, action);
};

export default reducer;
