import reduxQuerySync from 'redux-query-sync';
import { createBrowserHistory } from 'history';

export const basename =
  process.env.REACT_APP_BASENAME ||
  process.env.PUBLIC_URL ||
  '/';

export const history = createBrowserHistory({ basename });

export const querySync = reduxQuerySync.enhancer({
  params: {
    model: {
      selector: (...args) =>
        window.location.pathname.replace(basename, '').length !== 0 ?
          args[0].model.selected :
          undefined,
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
    }
  },
  history: history,
  initialTruth: 'location'
});
