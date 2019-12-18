import reduxQuerySync from 'redux-query-sync';

const querySync = reduxQuerySync.enhancer({
  params: {
    selected: {
      selector: (state) =>
        state.gene.selected && state.gene.selected.length ?
          state.gene.selected.map((selected) => selected.id).join('-') :
          '',
      action: (value) => ({
        type: 'SELECT_GENES_FROM_URL',
        payload: {
          ids: value ? value.split('-').map((id) => Number(id)) : null
        }
      })
    }
  },
  initialTruth: 'location'
});

export default querySync;
