import React from 'react';
import { connect } from 'react-redux';

import Alert from '../../../components/alert';
import Table from './table';
import Controls from './controls';

import './index.css';

// genes selected section

let Selected = ({ anySelected }) => (
  <>
    {anySelected === false && <Alert text='No genes selected' />}
    {anySelected === true && (
      <>
        <Table />
        <Controls />
      </>
    )}
  </>
);

const mapStateToProps = (state) => ({
  anySelected: state.gene.selected.length ? true : false
});

Selected = connect(mapStateToProps)(Selected);

export default Selected;
