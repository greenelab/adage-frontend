import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import SearchComponent from '../../../components/search';
import Single from './single';
import { getSignatureSearch } from '../../../actions/signatures';
import { selectSignature } from '../../../actions/signatures';
import { isArray } from '../../../util/types';
import { isSelected } from '../../../reducers/signatures';
import { toCamelCase } from '../../../util/string';

import './index.css';

// signature search section

let Search = ({ model, list, results, select, search }) => {
  useEffect(() => {
    search({
      index: 0,
      model: model.id,
      query: ''
    });
  }, [model, list.length, search]);

  return (
    <SearchComponent
      length={results?.length || null}
      placeholder='search for a signature'
      onSearch={(value) => {
        const string = value.trim();
        search({
          index: 0,
          model: model,
          query: string
        });
      }}
      onKeySelect={(highlightedIndex) =>
        select({ id: results[highlightedIndex].id })
      }
      SingleComponent={<Single />}
      storageKey='signaturesearch'
    />
  );
};

const mapStateToProps = (state) => ({
  model: state.models.selected,
  list: state.signatures.list,
  results: mapSignatureSearch(state.signatures.searches[0] || {}, state).results
});

const mapDispatchToProps = (dispatch) => ({
  search: (...args) => dispatch(getSignatureSearch(...args)),
  select: (...args) => dispatch(selectSignature(...args))
});

Search = connect(mapStateToProps, mapDispatchToProps)(Search);

export default Search;

export const mapSignatureSearch = (search, state) => ({
  query: search.query,
  results: isArray(search.results) ?
    search.results.map((result) => mapSignatureResult(result, state)) :
    search.results
});

export const mapSignatureResult = (result, state) => ({
  ...result,
  selected: isSelected(state.signatures.selected, result.id),
  highlightedField: toCamelCase(result.maxSimilarityField || '')
});
