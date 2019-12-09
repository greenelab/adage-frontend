import React from 'react';
import { connect } from 'react-redux';

import Input from '../../../components/input';
import { cancelAction } from '../../../util/thunk-actions.js';
import { getGeneSearch } from '../../../actions/genes.js';
import { clearGeneSearch } from '../../../actions/genes.js';

import './index.css';

let SearchBox = ({ dispatch }) => (
  <Input
    multi
    placeholder='search for a gene'
    multiPlaceholder='search for a list of genes'
    onChange={(value) => {
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
  />
);

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
});

SearchBox = connect(null, mapDispatchToProps)(SearchBox);

export default SearchBox;
