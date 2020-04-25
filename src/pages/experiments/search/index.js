import React from 'react';
import { connect } from 'react-redux';

import SearchComponent from '../../../components/search';
import Single from './single';
import { getExperimentSearch } from '../../../actions/experiments';
import { selectExperiment } from '../../../actions/experiments';
import { isArray } from '../../../util/types';
import { isSelected } from '../../../reducers/experiments';
import { toCamelCase } from '../../../util/string';

import './index.css';

// experiment search section

let Search = ({ results, select, search }) => (
  <SearchComponent
    length={results?.length || null}
    placeholder='search for an experiment'
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
    storageKey='experimentSearch'
  />
);

const mapStateToProps = (state) => ({
  results: mapExperimentSearch(state.experiments.searches[0] || {}, state)
    .results
});

const mapDispatchToProps = (dispatch) => ({
  search: (...args) => dispatch(getExperimentSearch(...args)),
  select: (...args) => dispatch(selectExperiment(...args))
});

Search = connect(mapStateToProps, mapDispatchToProps)(Search);

export default Search;

export const mapExperimentSearch = (search, state) => ({
  query: search.query,
  results: isArray(search.results) ?
    search.results.map((result) => mapExperimentResult(result, state)) :
    search.results
});

export const mapExperimentResult = (result, state) => ({
  ...result,
  selected: isSelected(state.experiments.selected, result.accession),
  highlightedField: toCamelCase(result.maxSimilarityField || '')
});
