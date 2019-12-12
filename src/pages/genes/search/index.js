import React from 'react';
import { connect } from 'react-redux';

import SearchComponent from '../../../components/search';
import Single from './single';
import Multi from './multi';
import { getGeneSearch } from '../../../actions/genes.js';
import { clearGeneSearch } from '../../../actions/genes.js';
import { cancelAction } from '../../../actions/fetch.js';
import { selectGene } from '../../../actions/genes.js';
import { deselectGene } from '../../../actions/genes.js';
import { isArray } from '../../../util/types.js';

import './index.css';

let Search = ({ results, selectGene, deselectGene, dispatch }) => (
  <SearchComponent
    length={results ? results.length : null}
    multi
    placeholder='search for a gene'
    multiPlaceholder='search for a list of genes'
    onSearch={(value) => {
      const strings = value
        .split('\n')
        .map((search) => search.trim())
        .filter((search, index, array) => search || array.length === 1);
      const actions = strings.map((string, index) =>
        getGeneSearch({
          index: index,
          query: string,
          cancelType: 'GENE_SEARCH_' + index
        })
      );
      cancelAction({ cancelTypeRegex: /GENE_SEARCH.*/ });
      dispatch([clearGeneSearch(), [...actions]]);
    }}
    onKeySelect={(highlightedIndex) => {
      if (results[highlightedIndex].selected)
        deselectGene({ gene: results[highlightedIndex].raw });
      else
        selectGene({ gene: results[highlightedIndex].raw });
    }}
    SingleComponent={<Single />}
    MultiComponent={<Multi />}
  />
);

const mapStateToProps = (state) => ({
  results:
    isArray(state.gene.searches) &&
    state.gene.searches.length === 1 &&
    isArray(state.gene.searches[0].results) &&
    state.gene.searches[0].results.length ?
      state.gene.searches[0].results.map((result) =>
        mapGeneResult(result, state)
      ) :
      null
});

const mapDispatchToProps = (dispatch) => ({
  selectGene: (...args) => dispatch(selectGene(...args)),
  deselectGene: (...args) => dispatch(deselectGene(...args)),
  dispatch: dispatch
});

export const mapGeneResult = (result, state) => {
  const colKeys = [
    'standard_name',
    'systematic_name',
    'entrezid',
    'description'
  ];
  const highlightedKey = result.max_similarity_field;
  return {
    id: result.id,
    selected: state.gene.selected.some((selected) => selected.id === result.id),
    cols: colKeys.map((key) => result[key]),
    highlightedCol: colKeys.findIndex((key) => key === highlightedKey),
    raw: result
  };
};

Search = connect(mapStateToProps, mapDispatchToProps)(Search);

export default Search;
