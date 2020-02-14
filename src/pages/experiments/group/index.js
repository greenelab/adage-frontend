import React from 'react';
import { connect } from 'react-redux';

import Alert from '../../../components/alert';
import Table from './table';
import Controls from './controls';

import './index.css';

// experiments selected section

let Selected = ({ anySelected }) => (
  <>
    {anySelected === false && <Alert text='No experiment selected' />}
    {anySelected === true && (
      <>
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
