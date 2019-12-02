export const reduceQuery = (action) => {
  if (action.type.includes('_STARTED'))
    return 'loading';
  else if (action.type.includes('_SUCCEEDED')) {
    if (typeof action.payload === 'object') {
      if (Array.isArray(action.payload) && action.payload.length)
        return action.payload;
      else if (action.payload !== null && Object.keys(action.payload).length)
        return action.payload;
      else
        return 'empty';
    } else
      return 'error';
  } else if (action.type.includes('_FAILED'))
    return 'error';

  return null;
};
