import produce from 'immer';

import { isString } from '../util/types';
import { isArray } from '../util/types';
import { isObject } from '../util/types';
import { isEmpty } from '../util/types';
import { split } from '../util/string';
import { includes } from '../util/object';
import { actionStatuses } from '../actions/fetch';
import { defaultLimit } from '../backend';

// type check for key variables, run before and after reducer
const typeCheck = (draft) => {
  if (!isString(draft.list) && !isArray(draft.list))
    draft.list = [];
  if (!isArray(draft.searches))
    draft.searches = [];
  if (!isObject(draft.selected))
    draft.selected = {};
  if (!isString(draft.participations) && !isArray(draft.participations))
    draft.participations = actionStatuses.EMPTY;
  if (!isString(draft.activities) && !isArray(draft.activities))
    draft.activities = actionStatuses.EMPTY;
  if (!isString(draft.pickledGenes) && !isObject(draft.pickledGenes))
    draft.pickledGenes = actionStatuses.EMPTY;
  if (!isString(draft.enrichedGenes) && !isArray(draft.enrichedGenes))
    draft.enrichedGenes = actionStatuses.EMPTY;
};

// defines how state (redux store) changes in response to dispatched actions
const reducer = produce((draft, type, payload, meta) => {
  typeCheck(draft);

  switch (type) {
    case 'GET_SIGNATURE_LIST': {
      draft.list = payload;
      break;
    }

    case 'GET_SIGNATURE_SEARCH': {
      if (!isObject(draft.searches[meta.index]))
        draft.searches[meta.index] = {};
      let results;
      if (isArray(draft.list)) {
        results = searchSignatures(meta.query, draft.list);
        if (!results.length)
          results = actionStatuses.EMPTY;
      } else
        results = actionStatuses.LOADING;
      draft.searches[meta.index].results = results.slice(0, defaultLimit);
      break;
    }

    case 'SELECT_SIGNATURE': {
      draft.selected = payload;
      break;
    }

    case 'SELECT_SIGNATURE_FROM_URL': {
      const { id } = payload;
      if (!id)
        draft.selected = {};
      else
        draft.selected = { id };
      break;
    }

    case 'GET_SIGNATURE_PARTICIPATIONS': {
      draft.participations = payload;
      break;
    }

    case 'GET_SIGNATURE_ACTIVITIES': {
      draft.activities = payload;
      break;
    }

    case 'GET_PICKLED_GENES': {
      if (isArray(payload)) {
        // transform mygeneset.info schema into old tribe schema
        try {

        const genes = {};
        const sets = {};
        for (const geneset of payload) {
          sets[geneset.id] = {
            name: geneset.name,
            dbase: geneset.source,
            url: geneset[geneset.source]?.url,
            size: geneset.count
          };
          for (const gene of (geneset.genes || [])) {
            genes[gene.mygene_id] ??= new Set();
            genes[gene.mygene_id].add(geneset.id);
          }
        }
        for (const [gene, sets] of Object.entries(genes))
          genes[gene] = Array.from(sets);
        const bgtotal = Object.keys(genes).length;
        draft.pickledGenes = { genes, sets, bgtotal };
      } catch(error) {
        console.error(error);
      }
      } else
        draft.pickledGenes = payload;
      break;
    }

    case 'SET_ENRICHED_GENES': {
      if (isEmpty(payload))
        draft.enrichedGenes = actionStatuses.EMPTY;
      else
        draft.enrichedGenes = payload;
      break;
    }

    default: {
      break;
    }
  }

  // fill in details of selected from full list
  if (isArray(draft.list)) {
    const found = draft.list.find(
      (signature) => signature.id === draft.selected.id
    );
    if (found && !signatureIsLoaded(draft.selected))
      draft.selected = found;
  }

  typeCheck(draft);
}, {});

export default reducer;

export const isSelected = (selected, id) => selected.id === id;

export const signatureIsLoaded = (signature) =>
  signature?.name ? true : false;

export const searchSignatures = (query, list) =>
  list.filter((signature) =>
    includes(signature.name.toLowerCase(), split(query)));
