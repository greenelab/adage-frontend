import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import Alert from '../../../components/alert';
import Table from './table';
import Controls from './controls';
import { isArray } from '../../../util/types.js';
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
      dispatch([...actions]);
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
  anySelected:
    isArray(state.gene.selected) && state.gene.selected.length ? true : false
});

const mapDispatchToProps = (dispatch) => ({ dispatch: dispatch });

Selected = connect(mapStateToProps, mapDispatchToProps)(Selected);

export default Selected;

export const mapGeneSelected = (selected) => ({
  id: selected.id,
  status: selected.status,
  systematicName: selected.systematic_name,
  standardName: selected.standard_name,
  entrezId: selected.entrezid,
  description: selected.description
});

export const mapGeneSelectedDownload = (selected) => ({
  'Systematic Name': selected.systematic_name || '-',
  'Standard Name': selected.standard_name || '-',
  'Entrez Id': selected.entrezid || '-',
  'Description': selected.description || '-'
});
