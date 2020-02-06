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
import { isArray } from '../../../util/types';
import { isSelected } from '../../../reducers/genes';
import { toCamelCase } from '../../../util/string';
import { mapGene } from '../';

import './index.css';

// genes search section

let Search = ({ results, select, deselect, dispatch }) => (
  <SearchComponent
    length={results?.length || null}
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
        })
      );
      cancelAction({ cancelTypeRegex: /GENE_SEARCH.*/ });
      dispatch([clearGeneSearch(), [...actions]]);
    }}
    onKeySelect={(highlightedIndex) => {
      // select/deselect gene when row highlighted and enter key pressed
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
  dispatch
});

export const mapGeneResult = (result, state) => {
  const gene = mapGene(result);

  gene.selected = isSelected(state.gene.selected, result.id);

  gene.highlightedField = toCamelCase(result.max_similarity_field || '');
  if (gene.highlightedField === 'entrezid')
    gene.highlightedField = 'entrezId';

  return gene;
};

Search = connect(mapStateToProps, mapDispatchToProps)(Search);

export default Search;
