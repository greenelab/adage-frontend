import React from 'react';
import { connect } from 'react-redux';

import Tooltip from '../../../../components/tooltip';
import GeneLink from '../../link';
import Button from '../../../../components/button';
import TableComponent from '../../../../components/table';
import { selectGene } from '../../../../actions/genes';
import { deselectGene } from '../../../../actions/genes';

import { ReactComponent as CheckedIcon } from '../../../../images/checked.svg';
import { ReactComponent as UncheckedIcon } from '../../../../images/unchecked.svg';

import './index.css';

// single search result table

let Table = ({ results, highlightedIndex, select, deselect }) => {
  return (
    <TableComponent
      data={results}
      columns={[
        {
          name: ' ',
          value: ' ',
          width: '30px',
          padded: false,
          render: (cell) => (
            <Tooltip
              text={(cell.selected ? 'Deselect' : 'Select') + ' this gene'}
            >
              <Button
                icon={cell.selected ? <CheckedIcon /> : <UncheckedIcon />}
                onClick={() =>
                  (cell.selected ? deselect : select)({ id: cell.id })
                }
              />
            </Tooltip>
          )
        },
        {
          name: 'Standard Name',
          value: 'standardName',
          width: 'calc((100% - 30px) * 0.2)',
          render: (cell) => <GeneLink gene={cell} />
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
      highlightedIndex={highlightedIndex}
      sortable={false}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  select: (...args) => dispatch(selectGene(...args)),
  deselect: (...args) => dispatch(deselectGene(...args))
});

Table = connect(null, mapDispatchToProps)(Table);

export default Table;
