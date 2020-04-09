import { createAction } from './';
import { createFetchAction } from './fetch';

import { urlOrganismList } from '../backend/organisms';

// actions related to "organism" sub-object of state

// get full list of all organisms
export const getOrganismList = createFetchAction(
  'GET_ORGANISM_LIST',
  urlOrganismList
);

// select organism based on id
export const selectOrganism = createAction('SELECT_ORGANISM');
