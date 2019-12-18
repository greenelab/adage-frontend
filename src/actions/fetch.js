import { createAction } from 'redux-actions';

import { sleep } from '../util/debug.js';
import { isEmpty } from '../util/types.js';

// replacement for redux-thunk-actions
// provide the "cancelType" prop to any action made by this creator
// any new action will cancel all previous in-progress actions of the same type

// inspired by the technique illustrated here:
// https://dev.to/chromiumdev/cancellable-async-functions-in-javascript-5gp7

export const fetchActionStatuses = {
  LOADING: 'LOADING',
  EMPTY: 'EMPTY',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS'
};

const actionStore = {};

export const createFetchAction = (type, urlFunction) => ({
  ...props
}) => async (dispatch) => {
  const meta = () => ({ ...props });
  const action = createAction(type, null, meta);

  const loading = () => dispatch(action(fetchActionStatuses.LOADING));
  const empty = () => dispatch(action(fetchActionStatuses.EMPTY));
  const error = () => dispatch(action(fetchActionStatuses.ERROR));
  const success = (payload) => dispatch(action(payload));

  const cancelType = props.cancelType;
  delete props.cancelType;
  const actionId = newAction({ cancelType: cancelType });

  const url = urlFunction({ ...props });
  const controller = new AbortController();
  const signal = controller.signal;
  const generator = fetchJson(url, signal);

  loading();

  let resumeValue;
  for (let step = 0; step < 20; step++) {
    if (isStaleAction({ cancelType, actionId })) {
      console.groupCollapsed('stale action canceled');
      console.log('cancelType', cancelType);
      console.log('url', url);
      console.log('props', props);
      console.groupEnd('stale action canceled');
      controller.abort();
      break;
    }
    try {
      const { done, value } = generator.next(resumeValue);
      if (done) {
        if (isEmpty(value))
          empty();
        else
          success(value);
        break;
      }
      resumeValue = await Promise.resolve(value);
    } catch (errorMessage) {
      console.log(errorMessage);
      controller.abort();
      error();
      break;
    }
  }
};

const newAction = ({ cancelType }) => {
  if (cancelType)
    return (actionStore[cancelType] = new AbortController());
  else
    return null;
};

const isStaleAction = ({ cancelType, actionId }) =>
  cancelType && actionStore[cancelType] !== actionId;

export const cancelAction = ({ cancelTypeRegex }) => {
  for (const key of Object.keys(actionStore)) {
    if (key.match(cancelTypeRegex)) {
      if (actionStore[key] instanceof AbortController)
        actionStore[key].abort();
      delete actionStore[key];
    }
  }
};

function* fetchJson(url, signal) {
  // artificial delay for testing loading spinners and race conditions
  // yield sleep(500 + Math.random() * 500);

  const cachedResponse = window.sessionStorage.getItem(url);
  if (cachedResponse)
    yield JSON.parse(cachedResponse);

  const fetchResponse = yield fetch(url, { signal });

  if (!fetchResponse.ok)
    throw new Error('Response not ok');

  const json = yield fetchResponse.json();

  let results;
  if (json && json.results)
    results = json.results;
  else
    results = json;

  const stringifiedResults = yield JSON.stringify(results);

  yield window.sessionStorage.setItem(url, stringifiedResults);

  return results;
}
