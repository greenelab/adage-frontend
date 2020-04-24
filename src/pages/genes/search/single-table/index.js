import React from 'react';
import { useState } from 'react';
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
  const [start, setStart] = useState(0);

  return (
    <TableComponent
      data={results}
      columns={[
        {
          render: ({ row, rowIndex, getRange }) => (
            <Clickable
              icon={row.selected ? <CheckedIcon /> : <UncheckedIcon />}
              button
              onClick={(event) => {
                if (!event.shiftKey) {
                  setStart(rowIndex);
                  if (row.selected)
                    deselect({ id: row.id });
                  else
                    select({ id: row.id });
                } else {
                  select({
                    ids: getRange(start, rowIndex).map((gene) => gene.id)
                  });
                }
              }}
              aria-label={(row.selected ? 'Deselect' : 'Select') + ' this gene'}
            />
          ),
          width: '30px',
          padded: false
        },
        {
          name: 'Standard Name',
          key: 'standardName',
          render: ({ row }) => <GeneLink gene={row} />,
          width: 'calc((100% - 30px) * 0.15)'
        },
        {
          name: 'Systematic Name',
          key: 'systematicName',
          width: 'calc((100% - 30px) * 0.15)'
        },
        {
          name: 'Entrez ID',
          key: 'entrezId',
          width: 'calc((100% - 30px) * 0.15)'
        },
        {
          name: 'Aliases',
          key: 'aliases',
          width: 'calc((100% - 30px) * 0.15)'
        },
        {
          name: 'Entrez Description',
          key: 'description',
          width: 'calc((100% - 30px) * 0.4)'
        }
      ]}
      minWidth='500px'
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
