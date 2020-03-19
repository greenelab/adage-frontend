import reduxQuerySync from 'redux-query-sync';
import { createBrowserHistory } from 'history';

import { isArray } from '../util/types';

// basename to apply to all urls (eg "/adage-frontend")
export const basename = process.env.REACT_APP_BASENAME || '/';

// history object
export const history = createBrowserHistory({ basename });

// handle url <--> state (redux store) interface
export const querySync = reduxQuerySync.enhancer({
  params: {
    'model': {
      selector: (state) => state.models.selected,
      action: (value) => ({
        type: 'SELECT_MODEL_FROM_URL',
        payload: {
          id: Number(value)
        }
      })
    },
    'genes': {
      selector: (state) =>
        isArray(state.genes.selected) && state.genes.selected.length ?
          state.genes.selected
            .map((selected) => selected.id || selected)
            .join('-') :
          undefined,
      action: (value) => ({
        type: 'SELECT_GENES_FROM_URL',
        payload: {
          ids: value ? value.split('-').map((id) => Number(id)) : null
        }
      })
    },
    'experiment': {
      selector: (state) => state.experiments.selected.accession,
      action: (value) => ({
        type: 'SELECT_EXPERIMENT_FROM_URL',
        payload: {
          accession: value || null
        }
      })
    },
    'diamond-samples': {
      selector: (state) =>
        isArray(state.samples.groups.diamond) &&
        state.samples.groups.diamond.length ?
          state.samples.groups.diamond.join('-') :
          undefined,
      action: (value) => ({
        type: 'GROUP_SAMPLES_FROM_URL',
        payload: {
          index: 'diamond',
          ids: value ? value.split('-').map((id) => Number(id)) : null
        }
      })
    },
    'spade-samples': {
      selector: (state) =>
        isArray(state.samples.groups.spade) && state.samples.groups.spade.length ?
          state.samples.groups.spade.join('-') :
          undefined,
      action: (value) => ({
        type: 'GROUP_SAMPLES_FROM_URL',
        payload: {
          index: 'spade',
          ids: value ? value.split('-').map((id) => Number(id)) : null
        }
      })
    },
    'signature': {
      selector: (state) => state.signatures.selected.id,
      action: (value) => ({
        type: 'SELECT_SIGNATURE_FROM_URL',
        payload: {
          id: Number(value)
        }
      })
    }
  },
  history: history,
  initialTruth: 'location'
});
