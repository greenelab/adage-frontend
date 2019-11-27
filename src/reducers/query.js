export const reduceQuery = (action) => {
  if (action.type.includes('_STARTED'))
    return 'loading';
  else if (action.type.includes('_SUCCEEDED')) {
    if (Array.isArray(action.payload)) {
      if (action.payload.length)
        return action.payload;
      else
        return 'empty';
    } else
      return 'error';
  } else if (action.type.includes('_FAILED'))
    return 'error';

  return null;
};
