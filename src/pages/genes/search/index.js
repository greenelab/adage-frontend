import React from 'react';
import { connect } from 'react-redux';

import Input from '../../../components/input';
import { searchGenes } from '../../../actions/genes';

import './index.css';

let Search = ({ ...props }) => {
  return (
    <Input
      multi
      placeholder='search for a gene'
      multiPlaceholder='search for a list of genes'
      onChange={(value) => props.dispatch(searchGenes({ search: value }))}
    />
  );
};

Search = connect()(Search);

export default Search;
