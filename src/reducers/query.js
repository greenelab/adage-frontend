export const reduceQuery = (type, payload) => {
  if (type.includes('_STARTED'))
    return 'loading';
  else if (type.includes('_SUCCEEDED')) {
    if (typeof payload === 'object') {
      if (Array.isArray(payload) && payload.length)
        return payload;
      else if (payload !== null && Object.keys(payload).length)
        return payload;
      else
        return 'empty';
    } else
      return 'error';
  } else if (type.includes('_FAILED'))
    return 'error';

  return null;
};
