import React from 'react';
import { connect } from 'react-redux';

import Alert from '../../../components/alert';
import Table from '../../../components/table';
import { isArray } from '../../../util/types.js';

let Selected = ({ selected }) => (
  <>
    {isArray(selected) && (
      <Table
        data={selected}
        fields={[
          'standardName',
          'systematicName',
          'entrezId',
          'description',
          'aliases',
          'weight'
        ]}
        head={[
          'Standard Name',
          'Systematic Name',
          'Entrez ID',
          'Description',
          'Aliases',
          'Weight'
        ]}
        widths={['15%', '15%', '15%', '25%', '15%', '15%']}
        aligns={['', '', '', '', '', 'center']}
      />
    )}
    {!isArray(selected) && <Alert text='No genes selected' />}
  </>
);

const mapStateToProps = (state) => ({
  selected:
    isArray(state.gene.selected) && state.gene.selected.length ?
      state.gene.selected.map((selected) => mapGeneSelected(selected)) :
      null
});

const mapGeneSelected = (selected) => ({
  systematicName: selected.systematic_name,
  standardName: selected.standard_name,
  entrezId: selected.entrezid,
  description: selected.description,
  aliases: selected.aliases,
  weight: selected.weight
});

Selected = connect(mapStateToProps)(Selected);

export default Selected;
