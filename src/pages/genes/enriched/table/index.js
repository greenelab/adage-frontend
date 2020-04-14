import React from 'react';
import { connect } from 'react-redux';

import TableComponent from '../../../../components/table';
import SignatureLink from '../../../signature/link';
import GeneLink from '../../../gene/link';
import { toExponential } from '../../../../util/string';

import './index.css';

// table of enriched signatures for selected genes

let Table = ({ enrichedSignatures }) => (
  <TableComponent
    data={enrichedSignatures}
    columns={[
      {
        name: 'Name',
        key: 'name',
        render: ({ row }) => <SignatureLink signature={row} />,
        width: '25%'
      },
      {
        name: 'Overlapping Genes',
        key: 'genes',
        value: ({ cell }) => cell.map((gene) => gene.name).join(' '),
        render: ({ cell }) =>
          cell.map((gene, index) => (
            <GeneLink
              key={index}
              gene={gene}
              extraTooltip={'weight: ' + gene.weight}
            />
          )),
        width: '60%'
      },
      {
        name: 'p-value',
        key: 'pValue',
        render: ({ cell }) => toExponential(cell),
        width: '20%'
      }
    ]}
    defaultSortKey='pValue'
    defaultSortUp={false}
    freezeCol={false}
  />
);

const mapStateToProps = (state) => ({
  enrichedSignatures: state.genes.enrichedSignatures.map((signature) => ({
    id: signature.id,
    name: signature.name,
    genes: signature.selectedParticipatingGenes,
    pValue: signature.pValue
  }))
});

Table = connect(mapStateToProps)(Table);

export default Table;
