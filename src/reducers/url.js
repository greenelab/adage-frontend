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
      selector: (state) => state.model.selected,
      action: (value) => ({
        type: 'SELECT_MODEL_FROM_URL',
        payload: {
          id: Number(value)
        }
      })
    },
    'genes': {
      selector: (state) =>
        isArray(state.gene.selected) && state.gene.selected.length ?
          state.gene.selected
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
    'experiments': {
      selector: (state) => state.experiment.selected.accession,
      action: (value) => ({
        type: 'SELECT_EXPERIMENTS_FROM_URL',
        payload: {
          accession: value || null
        }
      })
    },
    'diamond-samples': {
      selector: (state) =>
        isArray(state.sample.groups.diamond) &&
        state.sample.groups.diamond.length ?
          state.sample.groups.diamond.join('-') :
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
        isArray(state.sample.groups.spade) && state.sample.groups.spade.length ?
          state.sample.groups.spade.join('-') :
          undefined,
      action: (value) => ({
        type: 'GROUP_SAMPLES_FROM_URL',
        payload: {
          index: 'spade',
          ids: value ? value.split('-').map((id) => Number(id)) : null
        }
      })
    },
    'signatures': {
      selector: (state) => state.signature.selected.id,
      action: (value) => ({
        type: 'SELECT_SIGNATURES_FROM_URL',
        payload: {
          id: Number(value)
        }
      })
    }
  },
  history: history,
  initialTruth: 'location'
});
