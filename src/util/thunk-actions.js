import { createAction } from 'redux-actions';

import { isArray } from './types.js';

// replacement for redux-thunk-actions
// provide the "cancelType" prop to any action made by this creator
// any new action will cancel all previous in-progress actions of the same type

export const thunkActionStatuses = {
  LOADING: 'LOADING',
  EMPTY: 'EMPTY',
  ERROR: 'ERROR'
};

const actionStore = {};

export const createActionThunk = (type, func) => ({ ...props }) => async (
  dispatch
) => {
  const meta = () => ({ ...props });
  const action = createAction(type, null, meta);

  const cancelType = props.cancelType;
  delete props.cancelType;

  let actionId = null;
  if (cancelType) {
    actionId = generateActionId();
    actionStore[cancelType] = actionId;
  }

  dispatch(action(thunkActionStatuses.LOADING));

  let payload;
  try {
    payload = await func({ ...props });

    if (isStaleAction({ cancelType, actionId }))
      return;

    if (
      (isArray(payload) && payload.length) ||
      (payload !== null && Object.keys(payload).length)
    )
      dispatch(action(payload));
    else
      dispatch(action(thunkActionStatuses.EMPTY));
  } catch (error) {
    if (isStaleAction({ cancelType, actionId }))
      return;

    console.error(error);
    dispatch(action(thunkActionStatuses.ERROR));
  }
};

const generateActionId = () => Math.random();

const isStaleAction = ({ cancelType, actionId }) =>
  cancelType && actionStore[cancelType] !== actionId;

export const cancelAction = ({ cancelTypeRegex }) => {
  for (const key of Object.keys(actionStore)) {
    if (key.match(cancelTypeRegex))
      delete actionStore[key];
  }
};
