import models from './models.js';
import genes from './genes.js';

const reducer = (state = {}, action = {}) =>
  compose(models, genes)(state, action);

export default reducer;

// simplifies
// func1(func2(func3(state, action), action), action)
// to
// compose(func1, func2, func3)(state, action)
const compose = (...funcs) =>
  funcs.reduce((a, b) => (state, action) => a(b(state, action), action));
