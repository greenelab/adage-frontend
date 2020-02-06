import React from 'react';
import { connect } from 'react-redux';

import Tooltip from '../../../../components/tooltip';
import Link from '../../../../components/link';
import Button from '../../../../components/button';
import TableComponent from '../../../../components/table';
import { deselectGene } from '../../../../actions/genes';
import { mapGene } from '../../';

import { ReactComponent as CrossIcon } from '../../../../images/cross.svg';

import './index.css';

// table of selected genes

let Table = ({ selected, deselect }) => (
  <TableComponent
    data={selected}
    columns={[
      {
        name: ' ',
        value: 'deselect',
        width: '30px',
        padded: false,
        render: (cell) => (
          <Tooltip text='Deselect this gene'>
            <Button
              icon={<CrossIcon />}
              onClick={() => deselect({ id: cell.id })}
            />
          </Tooltip>
        )
      },
      {
        name: 'Standard Name',
        value: 'standardName',
        width: 'calc((100% - 30px) * 0.2)',
        render: (cell) => (
          <Link
            to={'/gene/' + cell.id}
            newTab
            button={false}
            text={cell.standardName}
            tooltip={'Open details page for gene ' + cell.standardName}
          />
        )
      },
      {
        name: 'Systematic Name',
        value: 'systematicName',
        width: 'calc((100% - 30px) * 0.2)'
      },
      {
        name: 'Entrez ID',
        value: 'entrezId',
        width: 'calc((100% - 30px) * 0.2)'
      },
      {
        name: 'Description',
        value: 'description',
        width: 'calc((100% - 30px) * 0.4)'
      }
    ]}
  />
);

const mapStateToProps = (state) => ({
  selected: state.gene.selected.map((selected) => mapGene(selected))
});

const mapDispatchToProps = (dispatch) => ({
  deselect: (...args) => dispatch(deselectGene(...args))
});

Table = connect(mapStateToProps, mapDispatchToProps)(Table);

export default Table;
