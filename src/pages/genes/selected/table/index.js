import React from 'react';
import { connect } from 'react-redux';

import Tooltip from '../../../../components/tooltip';
import Link from '../../../../components/link';
import Button from '../../../../components/button';
import Alert from '../../../../components/alert';
import TableComponent from '../../../../components/table';
import { deselectGene } from '../../../../actions/genes.js';
import { isArray } from '../../../../util/types.js';
import { mapGeneSelected } from '../';

import { ReactComponent as Info } from '../../../../images/info.svg';
import { ReactComponent as Cross } from '../../../../images/cross.svg';

import './index.css';

let Table = ({ selected, deselectGene }) => (
  <>
    <TableComponent
      data={selected.map((selected) => ({
        ...selected,
        info: (
          <Tooltip text='View full gene details' horizontalAlign='right'>
            <Link to={'/gene/' + selected.id} newTab icon={<Info />} />
          </Tooltip>
        ),
        deselect: (
          <Tooltip text='Deselect this gene' horizontalAlign='right'>
            <Button
              icon={<Cross />}
              onClick={() => deselectGene({ gene: selected.raw })}
            />
          </Tooltip>
        )
      }))}
      fields={[
        'standardName',
        'systematicName',
        'entrezId',
        'description',
        'aliases',
        'weight',
        'info',
        'deselect'
      ]}
      head={[
        'Standard Name',
        'Systematic Name',
        'Entrez ID',
        'Description',
        'Aliases',
        'Weight',
        ' ',
        ' '
      ]}
      widths={[
        'calc((100% - 30px - 30px) * 0.15)',
        'calc((100% - 30px - 30px) * 0.15)',
        'calc((100% - 30px - 30px) * 0.15)',
        'calc((100% - 30px - 30px) * 0.25)',
        'calc((100% - 30px - 30px) * 0.15)',
        'calc((100% - 30px - 30px) * 0.15)',
        '30px',
        '30px'
      ]}
      aligns={['', '', '', '', 'center', 'center', 'center']}
    />
    {!selected.length && <Alert text='No genes selected' />}
  </>
);

const mapStateToProps = (state) => ({
  selected: isArray(state.gene.selected) ?
    state.gene.selected.map((selected) => mapGeneSelected(selected)) :
    []
});

const mapDispatchToProps = (dispatch) => ({
  deselectGene: (...args) => dispatch(deselectGene(...args))
});

Table = connect(mapStateToProps, mapDispatchToProps)(Table);

export default Table;
