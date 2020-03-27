import React from 'react';
import { connect } from 'react-redux';

import ExperimentLink from '../../../experiment/link';
import Clickable from '../../../../components/clickable';
import TableComponent from '../../../../components/table';
import { selectExperiment } from '../../../../actions/experiments';

import { ReactComponent as RadioedIcon } from '../../../../images/radioed.svg';
import { ReactComponent as UnradioedIcon } from '../../../../images/unradioed.svg';

import './index.css';

// single search result table

let Table = ({ results, highlightedIndex, select }) => (
  <TableComponent
    data={results}
    columns={[
      {
        render: ({ row }) => (
          <Clickable
            icon={row.selected ? <RadioedIcon /> : <UnradioedIcon />}
            button
            onClick={() => select({ accession: row.accession })}
            aria-label="Select this experiment"
          />
        ),
        width: '30px',
        padded: false
      },
      {
        name: 'Accession',
        key: 'accession',
        render: ({ row }) => <ExperimentLink experiment={row} />,
        width: 'calc((100% - 30px) * 0.25)'
      },
      {
        name: 'Samples',
        key: 'samples',
        value: ({ cell }) => cell?.length,
        render: ({ cell }) => cell?.length,
        width: 'calc((100% - 30px) * 0.15)',
        align: 'center'
      },
      {
        name: 'Name',
        key: 'name',
        width: 'calc((100% - 30px) * 0.6)'
      }
    ]}
    highlightedIndex={highlightedIndex}
    sortable={false}
  />
);

const mapDispatchToProps = (dispatch) => ({
  select: (...args) => dispatch(selectExperiment(...args))
});

Table = connect(null, mapDispatchToProps)(Table);

export default Table;
