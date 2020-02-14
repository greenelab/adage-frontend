import reduxQuerySync from 'redux-query-sync';
import { createBrowserHistory } from 'history';

// basename to apply to all urls (eg "/adage-frontend")
export const basename =
  process.env.REACT_APP_BASENAME || process.env.PUBLIC_URL || '/';

// history object
export const history = createBrowserHistory({ basename });

// handle url <--> state (redux store) interface
export const querySync = reduxQuerySync.enhancer({
  params: {
    model: {
      selector: (state) => state.model.selected,
      action: (value) => ({
        type: 'SELECT_MODEL_FROM_URL',
        payload: {
          id: Number(value)
        }
      })
    },
    genes: {
      selector: (state) =>
        state.gene.selected && state.gene.selected.length ?
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
    experiments: {
      selector: (state) => state.experiment.selected.accession,
      action: (value) => ({
        type: 'SELECT_EXPERIMENTS_FROM_URL',
        payload: {
          accession: value || null
        }
      })
    }
  },
  history: history,
  initialTruth: 'location'
});
