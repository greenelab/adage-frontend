import React from 'react';
import { connect } from 'react-redux';

import Alert from '../../../components/alert';
import Details from './details';
import Table from './table';

import './index.css';

// selected signature section

let Selected = ({ anySelected, selected }) => (
  <>
    {anySelected === false && <Alert text="No signature selected" />}
    {anySelected === true && (
      <>
        <Details />
        <Table />
      </>
    )}
  </>
);

const mapStateToProps = (state) => ({
  anySelected: state.signatures.selected.id ? true : false,
  selected: state.signatures.selected
});

Selected = connect(mapStateToProps)(Selected);

export default Selected;
