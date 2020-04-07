import produce from 'immer';

import { actionStatuses } from '../actions/fetch';
import { isEmpty } from '../util/types';
import { isString } from '../util/types';
import { isArray } from '../util/types';
import { isObject } from '../util/types';

// type check for key variables, run before and after reducer
const typeCheck = (draft) => {
  if (!isString(draft.list) && !isArray(draft.list))
    draft.list = [];
  if (!isArray(draft.searches))
    draft.searches = [];
  if (!isArray(draft.selected))
    draft.selected = [];
  if (!isString(draft.participations) && !isArray(draft.participations))
    draft.participations = actionStatuses.EMPTY;
  if (!isString(draft.enrichedSignatures) && !isArray(draft.enrichedSignatures))
    draft.enrichedSignatures = actionStatuses.EMPTY;
  if (!isString(draft.edges) && !isArray(draft.edges))
    draft.edges = actionStatuses.EMPTY;
};

// defines how state (redux store) changes in response to dispatched actions
const reducer = produce((draft, type, payload, meta) => {
  typeCheck(draft);

  switch (type) {
    case 'GET_GENE_LIST': {
      draft.list = mapGeneResults(payload);
      break;
    }

    case 'GET_GENE_SEARCH': {
      if (!isObject(draft.searches[meta.index]))
        draft.searches[meta.index] = {};
      draft.searches[meta.index].query = meta.query;
      draft.searches[meta.index].results = mapGeneResults(payload);
      break;
    }

    case 'CLEAR_GENE_SEARCH': {
      draft.searches = [];
      draft.searches[0] = { results: actionStatuses.EMPTY };
      break;
    }

    case 'SELECT_GENE': {
      if (isSelected(draft.selected, payload.id))
        break;
      draft.selected.push({ id: payload.id });
      break;
    }

    case 'DESELECT_GENE': {
      draft.selected = filterSelected(draft.selected, payload.id);
      break;
    }

    case 'DESELECT_ALL_GENES': {
      draft.selected = [];
      break;
    }

    case 'SELECT_FIRST_GENES': {
      for (const search of draft.searches) {
        const firstResult =
          isArray(search.results) && search.results.length ?
            search.results[0] :
            null;
        if (!firstResult)
          continue;
        if (isSelected(draft.selected, firstResult.id))
          continue;
        draft.selected.push({ id: firstResult.id });
      }
      break;
    }

    case 'DESELECT_FIRST_GENES': {
      for (const search of draft.searches) {
        const firstResult =
          isArray(search.results) && search.results.length ?
            search.results[0] :
            null;
        if (!firstResult)
          continue;
        draft.selected = filterSelected(draft.selected, firstResult.id);
      }
      break;
    }

    case 'SELECT_GENES_FROM_URL': {
      if (!payload.ids || !isArray(payload.ids) || !payload.ids.length)
        draft.selected = [];
      else
        draft.selected = payload.ids.map((id) => ({ id }));
      break;
    }

    case 'GET_GENE_PARTICIPATIONS': {
      draft.participations = payload;
      break;
    }

    case 'SET_ENRICHED_SIGNATURES': {
      if (isArray(payload)) {
        if (isEmpty(payload))
          draft.enrichedSignatures = actionStatuses.EMPTY;
        else
          draft.enrichedSignatures = payload;
      } else
        draft.enrichedSignatures = draft.participations;
      break;
    }

    case 'GET_GENE_EDGES': {
      if (meta.selectedGenes.length)
        draft.edges = payload;
      else
        draft.edges = actionStatuses.EMPTY;
      break;
    }

    default: {
      break;
    }
  }

  // fill in details of selected from full list
  if (isArray(draft.list)) {
    for (const [key, selected] of Object.entries(draft.selected)) {
      const found = draft.list.find((gene) => gene.id === selected.id);
      if (found && !geneIsLoaded(selected))
        draft.selected[key] = found;
    }
  }

  typeCheck(draft);
}, {});

export default reducer;

export const isSelected = (selected, id) =>
  selected.some((selected) => selected.id === id);

export const filterSelected = (selected, id) =>
  selected.filter((selected) => !(selected.id === id));

export const mapGeneResults = (genes) =>
  isArray(genes) ? genes.map(mapGene) : genes;

export const mapGene = (gene) => ({
  ...gene,
  name: gene.standardName || gene.systematicName || gene.entrezid || '-',
  entrezId: gene.entrezid
});

export const geneIsLoaded = (gene) => gene?.name ? true : false;
