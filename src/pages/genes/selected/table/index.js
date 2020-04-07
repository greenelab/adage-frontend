import React from 'react';
import { connect } from 'react-redux';

import GeneLink from '../../../gene/link';
import Clickable from '../../../../components/clickable';
import TableComponent from '../../../../components/table';
import { deselectGene } from '../../../../actions/genes';
import { makeMapDispatchToProps } from '../../../../actions';

import { ReactComponent as CrossIcon } from '../../../../images/cross.svg';

import './index.css';

// table of selected genes

let Table = ({ selectedGenes, deselectGene }) => (
  <TableComponent
    data={selectedGenes}
    columns={[
      {
        render: ({ row }) => (
          <Clickable
            icon={<CrossIcon />}
            button
            onClick={() => deselectGene({ id: row.id })}
            aria-label='Deselect this gene'
          />
        ),
        width: '30px',
        padded: false
      },
      {
        name: 'Standard Name',
        key: 'standardName',
        render: ({ row }) => <GeneLink gene={row} />,
        width: 'calc((100% - 30px) * 0.2)'
      },
      {
        name: 'Systematic Name',
        key: 'systematicName',
        width: 'calc((100% - 30px) * 0.2)'
      },
      {
        name: 'Entrez ID',
        key: 'entrezId',
        width: 'calc((100% - 30px) * 0.2)'
      },
      {
        name: 'Entrez Description',
        key: 'description',
        width: 'calc((100% - 30px) * 0.4)'
      }
    ]}
  />
);

const mapStateToProps = (state) => ({
  selectedGenes: state.genes.selected
});

const mapDispatchToProps = makeMapDispatchToProps({ deselectGene });

Table = connect(mapStateToProps, mapDispatchToProps)(Table);

export default Table;
