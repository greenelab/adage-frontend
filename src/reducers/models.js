import produce from 'immer';

const reducer = produce((draft, type, payload, meta) => {
  switch (type) {
    case 'GET_MODEL_DETAILS':
      draft.details = payload;
      break;

    case 'GET_MODEL_LIST':
      draft.list = payload;
      break;

    case 'SET_SELECTED_MODEL':
      if (payload.id)
        draft.selected = payload.id;
      if (!draft.selected && Array.isArray(draft.list) && draft.list.length)
        draft.selected = draft.list[0].id;
      break;

    default:
      break;
  }
}, {});

export default reducer;
