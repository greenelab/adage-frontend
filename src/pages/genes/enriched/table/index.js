import React from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';

import TableComponent from '../../../../components/table';
import Link from '../../../../components/link';
import { mapGene } from '../../';

import './index.css';

let Table = ({ enrichedSignatures }) => (
  <TableComponent
    data={enrichedSignatures}
    columns={[
      {
        name: 'Name',
        value: 'name',
        width: '25%',
        render: (cell) => (
          <Link
            to={'/signature/' + cell.id}
            newTab
            button={false}
            text={cell.name}
          />
        )
      },
      {
        name: 'Overlapping Genes',
        value: (cell) => cell.genes.map((gene) => gene.name).join(' '),
        width: '50%',
        render: (cell) =>
          cell.genes.map((gene, index) => (
            <Fragment key={index}>
              <Link
                to={'/gene/' + gene.id}
                newTab
                button={false}
                text={gene.name}
              />
              &nbsp;
            </Fragment>
          ))
      },
      {
        name: 'p-value',
        value: 'pValue',
        width: '25%',
        align: 'center',
        field: true
      }
    ]}
    defaultSort={[{ id: 'pValue', desc: false }]}
  />
);

const mapStateToProps = (state) => ({
  enrichedSignatures: state.gene.enrichedSignatures.map((signature) => ({
    id: signature.id,
    name: signature.name,
    genes: signature.matchedGenes.map(mapGene),
    pValue: signature.pValue
  }))
});

Table = connect(mapStateToProps)(Table);

export default Table;
