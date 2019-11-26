import models from './models.js';
import genes from './genes.js';

const reducer = (state = {}, action) => compose(models, genes)(state, action);

export default reducer;

// simplifies
// func1(func2(func3(firstArg, secondArg), secondArg), secondArg)
// to
// compose(func1, func2, func3)(firstArg, secondArg)
const compose = (...funcs) =>
  funcs.reduce((a, b) => (state, action) => a(b(state, action), action));
