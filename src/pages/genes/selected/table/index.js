import React from 'react';
import { connect } from 'react-redux';

import Tooltip from '../../../../components/tooltip';
import Link from '../../../../components/link';
import Button from '../../../../components/button';
import TableComponent from '../../../../components/table';
import { deselectGene } from '../../../../actions/genes.js';
import { mapGeneSelected } from '../';

import { ReactComponent as Info } from '../../../../images/info.svg';
import { ReactComponent as Cross } from '../../../../images/cross.svg';

import './index.css';

let Table = ({ selected, deselect }) => (
  <TableComponent
    data={selected.map((selected) => ({
      ...selected,
      deselect: (
        <Tooltip text='Deselect this gene' horizontalAlign='left'>
          <Button
            icon={<Cross />}
            onClick={() => deselect({ id: selected.id })}
          />
        </Tooltip>
      ),
      info: (
        <Tooltip text='View full gene details' horizontalAlign='right'>
          <Link to={'/gene/' + selected.id} newTab icon={<Info />} />
        </Tooltip>
      )
    }))}
    columns={[
      {
        name: ' ',
        accessor: 'deselect',
        width: '30px'
      },
      {
        name: 'Standard Name',
        accessor: 'standardName',
        width: 'calc((100% - 30px - 30px) * 0.2)'
      },
      {
        name: 'Systematic Name',
        accessor: 'systematicName',
        width: 'calc((100% - 30px - 30px) * 0.2)'
      },
      {
        name: 'Entrez ID',
        accessor: 'entrezId',
        width: 'calc((100% - 30px - 30px) * 0.2)'
      },
      {
        name: 'Description',
        accessor: 'description',
        width: 'calc((100% - 30px - 30px) * 0.4)'
      },
      {
        name: ' ',
        accessor: 'info',
        width: '30px'
      }
    ]}
  />
);

const mapStateToProps = (state) => ({
  selected: state.gene.selected.map((selected) => mapGeneSelected(selected))
});

const mapDispatchToProps = (dispatch) => ({
  deselect: (...args) => dispatch(deselectGene(...args))
});

Table = connect(mapStateToProps, mapDispatchToProps)(Table);

export default Table;
