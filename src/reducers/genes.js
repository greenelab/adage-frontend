import produce from 'immer';

import { actionStatuses } from '../actions/fetch.js';
import { calculateEnrichedSignatures } from '../util/math.js';
import { isEmpty } from '../util/types.js';
import { isString } from '../util/types.js';
import { isArray } from '../util/types.js';
import { isObject } from '../util/types.js';

const typeCheck = (draft) => {
  if (!isString(draft.details) && !isObject(draft.details))
    draft.details = {};
  if (!isString(draft.list) && !isArray(draft.list))
    draft.list = [];
  if (!isArray(draft.searches))
    draft.searches = [];
  if (!isArray(draft.selected))
    draft.selected = [];
  if (!isString(draft.enrichedSignatures) && !isArray(draft.enrichedSignatures))
    draft.enrichedSignatures = actionStatuses.EMPTY;
  if (!isString(draft.edges) && !isArray(draft.edges))
    draft.edges = actionStatuses.EMPTY;
};

const reducer = produce((draft, type, payload, meta) => {
  typeCheck(draft);

  switch (type) {
    case 'GET_GENE_DETAILS':
      draft.details = payload;
      break;

    case 'GET_GENE_LIST':
      draft.list = payload;
      break;

    case 'GET_GENE_SEARCH':
      if (!isObject(draft.searches[meta.index]))
        draft.searches[meta.index] = {};
      draft.searches[meta.index].query = meta.query;
      draft.searches[meta.index].results = payload;
      break;

    case 'CLEAR_GENE_SEARCH':
      draft.searches = [];
      draft.searches[0] = { results: actionStatuses.EMPTY };
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
      if (!isArray(draft.list) || !draft.list.length)
        break;
      draft.selected = draft.selected.map((selected) =>
        draft.list.find((gene) => gene.id === selected.id)
      );

      break;

    case 'SELECT_GENES_FROM_URL':
      if (!payload.ids || !isArray(payload.ids) || !payload.ids.length)
        draft.selected = [];
      else
        draft.selected = payload.ids.map((id) => ({ id: id }));

      break;

    case 'GET_GENE_ENRICHED_SIGNATURES':
      const participations = payload;
      if (isArray(participations)) {
        const { selectedGenes, genes, signatures } = meta;
        const result = calculateEnrichedSignatures({
          selectedGenes,
          participations,
          genes,
          signatures
        });
        if (isEmpty(result))
          draft.enrichedSignatures = actionStatuses.EMPTY;
        else
          draft.enrichedSignatures = result;
      } else
        draft.enrichedSignatures = participations;
      break;

    case 'GET_GENE_EDGES':
      const { selectedGenes } = meta;
      if (selectedGenes.length)
        draft.edges = payload;
      else
        draft.edges = actionStatuses.EMPTY;
      break;

    default:
      break;
  }

  typeCheck(draft);
}, {});

export default reducer;

export const isSelected = (selected, id) =>
  selected.some((selected) => selected.id === id);

export const filterSelected = (selected, id) =>
  selected.filter((selected) => !(selected.id === id));
