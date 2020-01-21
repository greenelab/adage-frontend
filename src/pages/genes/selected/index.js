import React from 'react';
import { connect } from 'react-redux';

import Alert from '../../../components/alert';
import Table from './table';
import Controls from './controls';

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
  anySelected: state.gene.selected.length ? true : false
});

Selected = connect(mapStateToProps)(Selected);

export default Selected;

export const mapGeneSelected = (selected) => ({
  id: selected.id,
  status: selected.status,
  standardName: selected.standard_name,
  systematicName: selected.systematic_name,
  entrezId: selected.entrezid,
  description: selected.description
});

export const mapGeneSelectedDownload = (selected) => ({
  'Standard Name': selected.standard_name || '-',
  'Systematic Name': selected.systematic_name || '-',
  'Entrez Id': selected.entrezid || '-',
  'Description': selected.description || '-'
});
