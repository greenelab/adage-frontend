import React from 'react';
import { connect } from 'react-redux';

import GeneLink from '../../../gene/link';
import Clickable from '../../../../components/clickable';
import TableComponent from '../../../../components/table';
import { deselectGene } from '../../../../actions/genes';

import { ReactComponent as CrossIcon } from '../../../../images/cross.svg';

import './index.css';

// table of selected genes

let Table = ({ selected, deselect }) => (
  <TableComponent
    data={selected}
    columns={[
      {
        render: ({ row }) => (
          <Clickable
            icon={<CrossIcon />}
            button
            onClick={() => deselect({ id: row.id })}
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
    minWidth='500px'
  />
);

const mapStateToProps = (state) => ({
  selected: state.genes.selected
});

const mapDispatchToProps = (dispatch) => ({
  deselect: (...args) => dispatch(deselectGene(...args))
});

Table = connect(mapStateToProps, mapDispatchToProps)(Table);

export default Table;
