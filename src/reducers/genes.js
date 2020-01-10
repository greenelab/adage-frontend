import produce from 'immer';

import { actionStatuses } from '../actions/fetch.js';
import { calculateEnrichedSignatures } from '../util/math.js';
import { isNumber, isEmpty } from '../util/types.js';
import { isString } from '../util/types.js';
import { isArray } from '../util/types.js';
import { isObject } from '../util/types.js';

const reducer = produce((draft, type, payload, meta) => {
  const typeCheck = () => {
    if (!isString(draft.details) && !isObject(draft.details))
      draft.details = {};
    if (!isNumber(draft.count))
      draft.count = 0;
    if (!isArray(draft.searches))
      draft.searches = [];
    if (!isArray(draft.selected))
      draft.selected = [];
    if (
      !isString(draft.enrichedSignatures) &&
      !isArray(draft.enrichedSignatures)
    )
      draft.enrichedSignatures = actionStatuses.EMPTY;
  };

  typeCheck();

  switch (type) {
    case 'GET_GENE_DETAILS':
      draft.details = payload;
      break;

    case 'GET_GENE_COUNT':
      draft.count = payload;
      break;

    case 'GET_GENE_SEARCH':
      if (!isObject(draft.searches[meta.index]))
        draft.searches[meta.index] = {};
      draft.searches[meta.index].query = meta.query;
      draft.searches[meta.index].results = payload;
      break;

    case 'CLEAR_GENE_SEARCH':
      draft.searches = [];
      break;

    case 'SELECT_GENE':
      if (isSelected(draft.selected, payload.id))
        break;
      draft.selected.push({ id: payload.id });
      break;

    case 'DESELECT_GENE':
      draft.selected = filterSelected(draft.selected, payload.id);
      break;

    case 'DESELECT_ALL_GENES':
      draft.selected = [];
      break;

    case 'SELECT_FIRST_GENES':
      for (const search of draft.searches) {
        const firstResult =
          isArray(search.results) && search.results.length ?
            search.results[0] :
            null;
        if (!firstResult)
          break;
        if (isSelected(draft.selected, firstResult.id))
          break;
        draft.selected.push({ id: firstResult.id });
      }
      break;

    case 'DESELECT_FIRST_GENES':
      for (const search of draft.searches) {
        const firstResult =
          isArray(search.results) && search.results.length ?
            search.results[0] :
            null;
        if (!firstResult)
          break;

        draft.selected = filterSelected(draft.selected, firstResult.id);
      }
      break;

    case 'GET_GENE_SELECTED_DETAILS':
      const index = findSelected(draft.selected, meta.id);
      if (index === -1)
        break;
      if (isString(payload))
        draft.selected[index].status = payload;
      else if (isObject(payload)) {
        draft.selected[index].status = actionStatuses.SUCCESS;
        draft.selected[index] = { ...draft.selected[index], ...payload };
      }
      break;

    case 'SELECT_GENES_FROM_URL':
      if (!payload.ids || !isArray(payload.ids) || !payload.ids.length)
        draft.selected = [];
      else {
        draft.selected = payload.ids.map((id) => ({
          id,
          ...(draft.selected.find((selected) => selected.id === id) || {})
        }));
      }
      break;

    case 'GET_GENE_ENRICHED_SIGNATURES':
      const participations = payload;
      if (isArray(participations)) {
        const { selectedGenes, geneCount, signatures } = meta;

        const result = calculateEnrichedSignatures({
          selectedGenes,
          participations,
          geneCount,
          signatures
        });
        if (isEmpty(result))
          draft.enrichedSignatures = actionStatuses.EMPTY;
        else
          draft.enrichedSignatures = result;
      } else
        draft.enrichedSignatures = participations;
      break;

    default:
      break;
  }

  typeCheck();
}, {});

export default reducer;

export const isSelected = (selected, id) =>
  selected.some((selected) => selected.id === id);

export const filterSelected = (selected, id) =>
  selected.filter((selected) => !(selected.id === id));

export const findSelected = (selected, id) =>
  selected.findIndex((selected) => selected.id === id);
