import React from 'react';
import { connect } from 'react-redux';

import TableComponent from '../../../../components/table';

import './index.css';

let Table = ({ enrichedSignatures }) => (
  <TableComponent
    data={enrichedSignatures}
    fields={['name', 'genes', 'pValue']}
    head={['Name', 'Overlapping Genes', 'p-value', ' ']}
    widths={['25%', '50%', '25%']}
    aligns={[]}
  />
);

const mapStateToProps = (state) => ({
  enrichedSignatures: state.gene.enrichedSignatures.map((signature) => ({
    name: signature.name,
    genes: signature.matchedGenes.map((gene) => gene.standard_name).join(' '),
    pValue: signature.pValue
  }))
});

Table = connect(mapStateToProps)(Table);

export default Table;
