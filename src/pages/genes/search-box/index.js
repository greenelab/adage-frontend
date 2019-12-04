import React from 'react';
import { connect } from 'react-redux';

import Input from '../../../components/input';
import { getGeneSearch } from '../../../actions/genes.js';
import { clearGeneSearch } from '../../../actions/genes.js';

import './index.css';

let SearchBox = ({ ...props }) => (
  <Input
    multi
    placeholder='search for a gene'
    multiPlaceholder='search for a list of genes'
    onChangeExpanded={props.onChangeExpanded}
    onChange={(value) => {
      const strings = value
        .split('\n')
        .map((search) => search.trim())
        .filter((search, index, array) => search || array.length === 1);
      const actions = strings.map((string, index) =>
        getGeneSearch({ index: index, string: string })
      );
      props.dispatch([clearGeneSearch(), [...actions]]);
    }}
  />
);

SearchBox = connect()(SearchBox);

export default SearchBox;
