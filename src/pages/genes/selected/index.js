import React from 'react';
import { connect } from 'react-redux';

import Alert from '../../../components/alert';
import Table from './table';
import Controls from './controls';
import { isArray } from '../../../util/types.js';

import './index.css';

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
  anySelected:
    isArray(state.gene.selected) && state.gene.selected.length ? true : false
});

Selected = connect(mapStateToProps)(Selected);

export default Selected;

export const mapGeneSelected = (selected, download) => ({
  ...(!download && { id: selected.id }),
  systematicName: selected.systematic_name,
  standardName: selected.standard_name,
  entrezId: selected.entrezid,
  description: selected.description,
  ...(!download && { raw: selected })
});
