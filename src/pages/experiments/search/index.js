import React from 'react';
import { connect } from 'react-redux';

import SearchComponent from '../../../components/search';
import Single from './single';
import { getExperimentSearch } from '../../../actions/experiments';
import { selectExperiment } from '../../../actions/experiments';
import { isObject } from '../../../util/types';
import { isArray } from '../../../util/types';
import { isSelected } from '../../../reducers/experiments';
import { toCamelCase } from '../../../util/string';

import './index.css';

// experiment search section

let Search = ({ results, select, search }) => (
  <SearchComponent
    length={results?.length || null}
    placeholder='search for a experiment'
    onSearch={(value) => {
      const string = value.trim();
      search({
        index: 0,
        query: string,
        cancelType: 'GET_EXPERIMENT_SEARCH'
      });
    }}
    onKeySelect={(highlightedIndex) =>
      select({ accession: results[highlightedIndex].accession })
    }
    SingleComponent={<Single />}
  />
);

const mapStateToProps = (state) => ({
  results:
    state.experiment.searches.length === 1 &&
    isArray(state.experiment.searches[0].results) &&
    state.experiment.searches[0].results.length ?
      mapExperimentSearchPayload(state.experiment.searches[0], state) :
      []
});

const mapDispatchToProps = (dispatch) => ({
  search: (...args) => dispatch(getExperimentSearch(...args)),
  select: (...args) => dispatch(selectExperiment(...args))
});

Search = connect(mapStateToProps, mapDispatchToProps)(Search);

export default Search;

export const mapExperimentSearchPayload = (payload, state) => {
  if (isObject(payload))
    return mapExperimentSearch(payload, state);
  else if (isArray(payload))
    return payload.map((search) => mapExperimentSearch(search, state));
  else
    return payload;
};

export const mapExperimentSearch = (search, state) => ({
  query: search.query,
  results: isArray(search.results) ?
    search.results.map((result) => mapExperimentResult(result, state)) :
    search.results
});

export const mapExperimentResult = (result, state) => ({
  ...result,
  selected: isSelected(state.experiment.selected, result.accession),
  highlightedField: toCamelCase(result.maxSimilarityField || '')
});
