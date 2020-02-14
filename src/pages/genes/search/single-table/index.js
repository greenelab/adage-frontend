import React from 'react';
import { connect } from 'react-redux';

import GeneLink from '../../../gene/link';
import Clickable from '../../../../components/clickable';
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
            <Clickable
              icon={cell.selected ? <CheckedIcon /> : <UncheckedIcon />}
              button
              onClick={() =>
                (cell.selected ? deselect : select)({ id: cell.id })
              }
              aria-label={
                (cell.selected ? 'Deselect' : 'Select') + ' this gene'
              }
            />
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
          name: 'Entrez Description',
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
