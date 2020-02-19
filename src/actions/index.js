import { createAction as reduxCreateAction } from 'redux-actions';

export const createAction = (type) =>
  reduxCreateAction(type, null, (args) => ({
    ...args
  }));
