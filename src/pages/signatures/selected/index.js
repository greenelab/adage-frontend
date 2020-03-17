import React from 'react';
import { connect } from 'react-redux';

import Alert from '../../../components/alert';

import './index.css';

// selected signature section

let Selected = ({ anySelected, selected }) => (
  <>
    {anySelected === false && <Alert text="No signature selected" />}
    {anySelected === true && <>{selected.name}</>}
  </>
);

const mapStateToProps = (state) => ({
  anySelected: state.signature.selected.id ? true : false,
  selected: state.signature.selected
});

Selected = connect(mapStateToProps)(Selected);

export default Selected;
