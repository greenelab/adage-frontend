import React from 'react';
import { connect } from 'react-redux';

import SearchComponent from '../../../components/search';
import Single from './single';
import Multi from './multi';
import { getGeneSearch } from '../../../actions/genes';
import { clearGeneSearch } from '../../../actions/genes';
import { cancelAction } from '../../../actions/fetch';
import { selectGene } from '../../../actions/genes';
import { deselectGene } from '../../../actions/genes';
import { makeMapDispatchToProps } from '../../../actions';
import { isArray } from '../../../util/types';
import { toCamelCase } from '../../../util/string';
import { isSelected } from '../../../reducers/genes';

import './index.css';

// genes search section

let Search = ({ geneResults, selectGene, deselectGene, dispatch }) => (
  <SearchComponent
    length={geneResults?.length || 0}
    multi
    placeholder='search for a gene'
    multiPlaceholder='search for a list of genes'
    onSearch={(value) => {
      // split input string by lines
      const strings = value
        .split('\n')
        .map((search) => search.trim())
        .filter((search, index, array) => search || array.length === 1);

      // dispatch a search action for each string
      const actions = strings.map((string, index) =>
        getGeneSearch({
          index: index,
          query: string,
          cancelType: 'GET_GENE_SEARCH_' + index
        }));
      cancelAction({ cancelTypeRegex: /GENE_SEARCH.*/ });
      dispatch([clearGeneSearch(), [...actions]]);
    }}
    onKeySelect={(highlightedIndex) => {
      // select/deselect gene when row highlighted and enter key pressed
      if (geneResults[highlightedIndex].selected)
        deselectGene({ id: geneResults[highlightedIndex].id });
      else
        selectGene({ id: geneResults[highlightedIndex].id });
    }}
    SingleComponent={<Single />}
    MultiComponent={<Multi />}
  />
);

const mapStateToProps = (state) => ({
  geneResults: mapGeneSearch(state.genes.searches[0] || {}, state)?.results
});

const mapDispatchToProps = makeMapDispatchToProps({ selectGene, deselectGene });

Search = connect(mapStateToProps, mapDispatchToProps)(Search);

export default Search;

export const mapGeneSearch = (search, state) => ({
  query: search.query,
  results: isArray(search.results) ?
    search.results.map((result) => mapGeneResult(result, state)) :
    search.results
});

export const mapGeneResult = (result, state) => ({
  ...result,
  selected: isSelected(state.genes.selected, result.id),
  highlightedField: toCamelCase(result.maxSimilarityField || '')
});
