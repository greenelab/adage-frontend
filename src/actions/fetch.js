import { createAction } from 'redux-actions';
import sizeof from 'object-sizeof';

// import { sleep } from '../util/debug.js';
import { isEmpty } from '../util/types.js';

// replacement for redux-thunk-actions
// provide the "cancelType" prop to any action made by this creator
// any new action will cancel all previous in-progress actions of the same type

export const actionStatuses = {
  LOADING: 'LOADING',
  EMPTY: 'EMPTY',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS'
};

const actions = {};

let cache = {};
cache.size = 0;
cache.limit = 50 * 1000000; // in bytes

export const createFetchAction = (type, urlFunction) => ({
  ...props
}) => async (dispatch) => {
  const { cancelType } = props;

  const meta = () => props;
  const actionId = newAction({ cancelType: cancelType });
  const url = urlFunction(props);

  const setStatus = (status) => {
    if (isStaleAction({ cancelType, actionId })) {
      console.groupCollapsed('stale action canceled');
      console.log('cancelType', cancelType);
      console.log('url', url);
      console.log('props', props);
      console.groupEnd('stale action canceled');
    } else
      dispatch(createAction(type, null, meta)(status));
  };

  setStatus(actionStatuses.LOADING);
  try {
    const value = await fetchJson(url);
    if (isEmpty(value))
      setStatus(actionStatuses.EMPTY);
    else
      setStatus(value);
  } catch (error) {
    console.log(error);
    setStatus(actionStatuses.ERROR);
  }
};

const newAction = ({ cancelType }) => {
  if (cancelType) {
    actions[cancelType] = window.performance.now();
    return actions[cancelType];
  } else
    return null;
};

const isStaleAction = ({ cancelType, actionId }) => {
  return cancelType && actions[cancelType] !== actionId;
};

export const cancelAction = ({ cancelTypeRegex }) => {
  for (const key of Object.keys(actions)) {
    if (key.match(cancelTypeRegex))
      delete actions[key];
  }
};

const fetchJson = async (url) => {
  // await sleep(1000 + Math.random() * 100);

  if (cache[url])
    return cache[url];

  const fetchResponse = await fetch(url);

  if (!fetchResponse.ok)
    throw new Error('Response not ok');

  const json = await fetchResponse.json();

  const results = json?.results || json;

  const size = sizeof(results);

  if (cache.size + size < cache.limit) {
    cache.size += size;
    cache[url] = results;
  }

  return results;
};

window.clearCache = () => (cache = {});
