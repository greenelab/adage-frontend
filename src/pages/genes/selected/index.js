import React from 'react';
import { connect } from 'react-redux';

import Field from '../../../components/field';

let Selected = ({ selected }) => (
  <div>
    {selected.map((gene, index) => (
      <Field key={index}>{gene.standard_name}</Field>
    ))}
  </div>
);

const mapStateToProps = (state) => ({
  selected: state.gene.selected || []
});

Selected = connect(mapStateToProps)(Selected);

export default Selected;
