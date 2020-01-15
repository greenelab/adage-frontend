import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import Alert from '../../../components/alert';
import Table from './table';
import Controls from './controls';
import { getGeneSelectedDetails } from '../../../actions/genes.js';

import './index.css';

let Selected = ({ selected, anySelected, dispatch }) => {
  useEffect(() => {
    const actions = selected
      .filter((selected) => !selected.status)
      .map((selected) =>
        getGeneSelectedDetails({
          id: selected.id,
          cancelType: 'GET_GENE_SELECTED_DETAILS_' + selected.id
        })
      );
    if (actions.length)
      dispatch(...actions);
  });

  return (
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
};

const mapStateToProps = (state) => ({
  selected: state.gene.selected,
  anySelected: state.gene.selected.length ? true : false
});

const mapDispatchToProps = (dispatch) => ({ dispatch: dispatch });

Selected = connect(mapStateToProps, mapDispatchToProps)(Selected);

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
