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
    onKeySelect={(outlinedIndex) => {
      if (results[outlinedIndex].selected)
        deselectGene({ id: results[outlinedIndex].id });
      else
        selectGene({ id: results[outlinedIndex].id });
    }}
    SingleComponent={Single}
    MultiComponent={Multi}
  />
);

const mapStateToProps = (state) => ({
  results:
    isArray(state.gene.searches) &&
    state.gene.searches.length === 1 &&
    isArray(state.gene.searches[0].results) &&
    state.gene.searches[0].results.length ?
      state.gene.searches[0].results.map((result) => ({
        id: result.id,
        selected: state.gene.selected.includes(result.id)
      })) :
      null
});

const mapDispatchToProps = (dispatch) => ({
  selectGene: (...args) => dispatch(selectGene(...args)),
  deselectGene: (...args) => dispatch(deselectGene(...args)),
  dispatch: dispatch
});

Search = connect(mapStateToProps, mapDispatchToProps)(Search);

export default Search;
