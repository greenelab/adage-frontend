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
import { isSelected } from '../../../reducers/genes.js';
import { mapGene } from '../';

import './index.css';

let Search = ({ results, select, deselect, dispatch }) => (
  <SearchComponent
    length={results?.length || null}
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
          cancelType: 'GET_GENE_SEARCH_' + index
        })
      );
      cancelAction({ cancelTypeRegex: /GENE_SEARCH.*/ });
      dispatch([clearGeneSearch(), [...actions]]);
    }}
    onKeySelect={(highlightedIndex) => {
      if (results[highlightedIndex].selected)
        deselect({ id: results[highlightedIndex].id });
      else
        select({ id: results[highlightedIndex].id });
    }}
    SingleComponent={<Single />}
    MultiComponent={<Multi />}
  />
);

const mapStateToProps = (state) => ({
  results:
    state.gene.searches.length === 1 &&
    isArray(state.gene.searches[0].results) &&
    state.gene.searches[0].results.length ?
      state.gene.searches[0].results.map((result) =>
        mapGeneResult(result, state)
      ) :
      null
});

const mapDispatchToProps = (dispatch) => ({
  select: (...args) => dispatch(selectGene(...args)),
  deselect: (...args) => dispatch(deselectGene(...args)),
  dispatch: dispatch
});

export const mapGeneResult = (result, state) => {
  const gene = mapGene(result);
  gene.selected = isSelected(state.gene.selected, result.id);
  switch (result.max_similarity_field) {
    case 'standard_name':
      gene.highlightedField = 'standardName';
      break;
    case 'systematic_name':
      gene.highlightedField = 'systematicName';
      break;
    case 'entrezid':
      gene.highlightedField = 'entrezId';
      break;
    case 'description':
      gene.highlightedField = 'description';
      break;
    default:
      gene.highlightedField = '';
      break;
  }
  return gene;
};

Search = connect(mapStateToProps, mapDispatchToProps)(Search);

export default Search;
