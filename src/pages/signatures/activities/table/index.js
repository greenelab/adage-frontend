import React from 'react';
import { connect } from 'react-redux';

import TableComponent from '../../../../components/table';
import { mapActivities } from '../';

import './index.css';

// table of signature activities

let Table = ({ activities }) => (
  <TableComponent
    data={activities}
    columns={[
      {
        name: 'Experiment',
        key: 'experiment',
        width: '40%'
      },
      {
        name: 'Samples',
        key: 'samples',
        width: '12%'
      },
      {
        name: 'Activities',
        key: 'activities',
        width: '12%'
      },
      {
        name: 'Min',
        key: 'min',
        render: ({ cell }) => (cell || 0).toFixed(5),
        width: '12%'
      },
      {
        name: 'Max',
        key: 'max',
        render: ({ cell }) => (cell || 0).toFixed(5),
        width: '12%'
      },
      {
        name: 'Range',
        key: 'range',
        render: ({ cell }) => (cell || 0).toFixed(5),
        width: '12%'
      }
    ]}
    defaultSortKey='range'
    defaultSortUp={true}
    freezeCol={false}
  />
);

const mapStateToProps = (state) => ({
  activities: mapActivities(state.signatures.activities, state)
});

Table = connect(mapStateToProps)(Table);

export default Table;
