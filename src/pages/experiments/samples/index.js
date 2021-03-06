import React from 'react';
import { connect } from 'react-redux';

import Alert from '../../../components/alert';
import Table from './table';
import Controls from './controls';

import './index.css';

// selected experiment's samples section

let Samples = ({ anySelected }) => (
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
  anySelected: state.experiments.selected?.samples?.length ? true : false
});

Samples = connect(mapStateToProps)(Samples);

export default Samples;
