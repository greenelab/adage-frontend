import React from 'react';
import { connect } from 'react-redux';

import Alert from '../../../components/alert';
import Details from './details';
import Table from './table';
import Controls from './controls';

import './index.css';

let Selected = ({ anySelected }) => (
  <>
    {anySelected === false && <Alert text='No experiment selected' />}
    {anySelected === true && (
      <>
        <Details />
        <Table />
        <Controls />
      </>
    )}
  </>
);

const mapStateToProps = (state) => ({
  anySelected: state.experiment.selected.accession ? true : false
});

Selected = connect(mapStateToProps)(Selected);

export default Selected;
