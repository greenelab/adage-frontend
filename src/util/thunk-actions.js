import { createAction } from 'redux-actions';

import { isArray } from './types.js';

// replacement for redux-thunk-actions

export const createActionThunk = (type, func) => ({ ...props }) => async (
  dispatch
) => {
  const meta = () => ({ ...props });
  const action = createAction(type, null, meta);

  dispatch(action(thunkActionStatuses.LOADING));

  let payload;
  try {
    payload = await func({ ...props });
    if (
      (isArray(payload) && payload.length) ||
      (payload !== null && Object.keys(payload).length)
    )
      dispatch(action(payload));
    else
      dispatch(action(thunkActionStatuses.EMPTY));
  } catch (error) {
    console.error(error);
    dispatch(action(thunkActionStatuses.ERROR));
  }
};

export const thunkActionStatuses = {
  LOADING: 'LOADING',
  EMPTY: 'EMPTY',
  ERROR: 'ERROR'
};
