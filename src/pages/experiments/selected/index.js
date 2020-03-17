import React from 'react';
import { connect } from 'react-redux';

import Alert from '../../../components/alert';
import Details from './details';

import './index.css';

// selected experiment section

let Selected = ({ anySelected }) => (
  <>
    {anySelected === false && <Alert text="No experiment selected" />}
    {anySelected === true && <Details />}
  </>
);

const mapStateToProps = (state) => ({
  anySelected: state.experiment.selected.accession ? true : false
});

Selected = connect(mapStateToProps)(Selected);

export default Selected;
