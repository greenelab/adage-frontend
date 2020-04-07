import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import SearchComponent from '../../../components/search';
import Single from './single';
import { getSignatureSearch } from '../../../actions/signatures';
import { selectSignature } from '../../../actions/signatures';
import { makeMapDispatchToProps } from '../../../actions';
import { isArray } from '../../../util/types';
import { isSelected } from '../../../reducers/signatures';
import { toCamelCase } from '../../../util/string';

import './index.css';

// signature search section

let Search = ({
  selectedModel,
  signatureList,
  sigantureResults,
  selectSignature,
  getSignatureSearch
}) => {
  useEffect(() => {
    getSignatureSearch({
      index: 0,
      modelId: selectedModel.id,
      query: ''
    });
  }, [selectedModel.id, signatureList.length, getSignatureSearch]);

  return (
    <SearchComponent
      length={sigantureResults?.length || null}
      placeholder='search for a signature'
      onSearch={(value) => {
        const string = value.trim();
        getSignatureSearch({
          index: 0,
          modelId: selectedModel.id,
          query: string
        });
      }}
      onKeySelect={(highlightedIndex) =>
        selectSignature({ id: sigantureResults[highlightedIndex].id })
      }
      SingleComponent={<Single />}
    />
  );
};

const mapStateToProps = (state) => ({
  selectedModel: state.models.selected,
  signatureList: state.signatures.list,
  sigantureResults: mapSignatureSearch(state.signatures.searches[0] || {}, state)
});

const mapDispatchToProps = makeMapDispatchToProps({
  getSignatureSearch,
  selectSignature
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
