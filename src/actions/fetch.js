import { createAction } from 'redux-actions';
import sizeof from 'object-sizeof';

// import { sleep } from '../util/debug';
import { isEmpty } from '../util/types';
import { isObject } from '../util/types';
import { isArray } from '../util/types';
import { normalize } from '../util/object';

// replacement for redux-thunk-actions
// provide the "cancelType" prop to any action made by this creator
// any new action will cancel all previous in-progress actions of the same type

// fetch status key strings
export const actionStatuses = {
  LOADING: 'LOADING',
  EMPTY: 'EMPTY',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS'
};

// "global" action store
const actions = {};

// cache store and settings
let cache = {};
cache.size = 0;
cache.limit = 50 * 1000000; // in bytes

// action creator for fetch-style (asynchronous) actions
export const createFetchAction = (type, urlFunction) => (props = {}) => async (
  dispatch
) => {
  // get cancel type from action props if specified
  const { cancelType } = props;

  // pass all props provided to action through as meta data
  const meta = () => props;
  // create new unique action id
  const actionId = newAction({ cancelType: cancelType });
  // pass action props to url function to get url to fetch
  const url = urlFunction(props);

  // update the status of the action
  const setStatus = (status) => {
    // only actually dispatch action if it is still the latest of its type
    if (isStaleAction({ cancelType, actionId })) {
      console.groupCollapsed('stale action canceled');
      console.log('cancelType', cancelType);
      console.log('url', url);
      console.log('props', props);
      console.groupEnd('stale action canceled');
    } else
      dispatch(createAction(type, null, meta)(status));
  };

  // start fetching
  setStatus(actionStatuses.LOADING);
  try {
    const value = await fetchJson(url);
    // fetch completed
    if (isEmpty(value))
      setStatus(actionStatuses.EMPTY);
    else
      setStatus(value);
  } catch (error) {
    // error response from fetch
    console.log(error);
    setStatus(actionStatuses.ERROR);
  }
};

// create new unique action id based on timestamp, and put in action store
const newAction = ({ cancelType }) => {
  if (cancelType) {
    actions[cancelType] = window.performance.now();
    return actions[cancelType];
  } else
    return null;
};

// check if action is the latest one of its type
const isStaleAction = ({ cancelType, actionId }) => {
  return cancelType && actions[cancelType] !== actionId;
};

// delete action from store, effectively canceling it
export const cancelAction = ({ cancelTypeRegex }) => {
  for (const key of Object.keys(actions)) {
    if (key.match(cancelTypeRegex))
      delete actions[key];
  }
};

// fetch a url
const fetchJson = async (url) => {
  // await sleep(1000 + Math.random() * 100);

  // return cached response if it exists
  if (cache[url])
    return cache[url];

  // fetch from url
  const fetchResponse = await fetch(url);

  // if 404 or other, throw error
  if (!fetchResponse.ok)
    throw new Error('Response not ok');

  // convert response to json
  const json = await fetchResponse.json();

  // get results key within json, if it exists
  let results = json?.results || json;

  // normalize results
  if (isObject(results))
    results = normalize(results);
  else if (isArray(results))
    results = results.map(normalize);

  // add response to cache, if not over size limit
  const size = sizeof(results);
  if (cache.size + size < cache.limit) {
    cache.size += size;
    cache[url] = results;
  }

  return results;
};

// debug function to clear cache
window.clearCache = () => (cache = {});
