import React from 'react';
import { connect } from 'react-redux';

import SignatureLink from '../../../signature/link';
import Clickable from '../../../../components/clickable';
import TableComponent from '../../../../components/table';
import { selectSignature } from '../../../../actions/signatures';

import { ReactComponent as RadioedIcon } from '../../../../images/radioed.svg';
import { ReactComponent as UnradioedIcon } from '../../../../images/unradioed.svg';

import './index.css';

// single search result table

let Table = ({ results, highlightedIndex, select }) => {
  return (
    <TableComponent
      data={results}
      columns={[
        {
          render: ({ row }) => (
            <Clickable
              icon={row.selected ? <RadioedIcon /> : <UnradioedIcon />}
              button
              onClick={() => select({ id: row.id })}
              aria-label="Select this signature"
            />
          ),
          width: '30px',
          padded: false
        },
        {
          name: 'Name',
          key: 'id',
          render: ({ row }) => <SignatureLink signature={row} />,
          width: 'calc((100% - 30px) * 1)'
        }
      ]}
      highlightedIndex={highlightedIndex}
      sortable={false}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  select: (...args) => dispatch(selectSignature(...args))
});

Table = connect(null, mapDispatchToProps)(Table);

export default Table;
