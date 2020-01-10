import reduxQuerySync from 'redux-query-sync';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

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
    selected: {
      selector: (state) =>
        state.gene.selected && state.gene.selected.length ?
          state.gene.selected.map((selected) => selected.id).join('-') :
          undefined,
      action: (value) => ({
        type: 'SELECT_GENES_FROM_URL',
        payload: {
          ids: value ? value.split('-').map((id) => Number(id)) : null
        }
      })
    }
  },
  history: history,
  initialTruth: 'location'
});
