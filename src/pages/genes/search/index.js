import React from 'react';
import { connect } from 'react-redux';

import Input from '../../../components/input';
import { getGeneSearch } from '../../../actions/genes';

import './index.css';

let Search = ({ ...props }) => {
  return (
    <Input
      multi
      placeholder='search for a gene'
      multiPlaceholder='search for a list of genes'
      onChangeExpanded={props.onChangeExpanded}
      onChange={(value) => {
        const searches = value.split('\n');
        const actions = searches.map((search, index) =>
          getGeneSearch({ index: index, search: search })
        );
        props.dispatch([[...actions]]);
      }}
    />
  );
};

Search = connect()(Search);

export default Search;
