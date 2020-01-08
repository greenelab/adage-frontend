import { createAction } from 'redux-actions';
import sizeof from 'object-sizeof';

// import { sleep } from '../util/debug.js';
import { isEmpty } from '../util/types.js';

// replacement for redux-thunk-actions
// provide the "cancelType" prop to any action made by this creator
// any new action will cancel all previous in-progress actions of the same type

export const fetchActionStatuses = {
  LOADING: 'LOADING',
  EMPTY: 'EMPTY',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS'
};

const actions = {};

const cache = {};
cache.size = 0;
cache.limit = 20 * 1000000; // in bytes

export const createFetchAction = (type, urlFunction) => ({
  ...props
}) => async (dispatch) => {
  const meta = () => ({ ...props });
  const cancelType = props.cancelType;
  delete props.cancelType;
  const actionId = newAction({ cancelType: cancelType });
  const url = urlFunction({ ...props });

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

  setStatus(fetchActionStatuses.LOADING);
  try {
    const value = await fetchJson(url);
    if (isEmpty(value))
      setStatus(fetchActionStatuses.EMPTY);
    else
      setStatus(value);
  } catch (error) {
    console.log(error);
    setStatus(fetchActionStatuses.ERROR);
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
  // artificial delay for testing loading spinners and race conditions
  // await sleep(500 + Math.random() * 500);

  if (cache[url])
    return cache[url];

  const fetchResponse = await fetch(url);

  if (!fetchResponse.ok)
    throw new Error('Response not ok');

  const json = await fetchResponse.json();

  let results;
  if (json && json.results)
    results = json.results;
  else
    results = json;

  results.timestamp = window.performance.now();
  results.size = sizeof(results);

  if (results.size < cache.limit) {
    while (cache.size + results.size > cache.limit) {
      let oldestUrl;
      let oldestTimestamp = results.timestamp;
      for (const url of Object.keys(cache)) {
        if (cache[url].timestamp < oldestTimestamp) {
          oldestUrl = url;
          oldestTimestamp = cache[url].timestamp;
        }
      }
      if (oldestUrl) {
        cache.size -= cache[oldestUrl].size;
        delete cache[oldestUrl];
      }
    }
    cache.size += results.size;
    cache[url] = results;
  }

  return results;
};
