import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import TableComponent from '../../../../components/table';
import Canvas from '../../../../components/canvas';
import { getBackground } from './barcode';
import { getForeground } from './barcode';
import { mapActivities } from '../';

import './index.css';

// table of signature activities

let Table = ({ activities = {}, values = [] }) => {
  const [background, setBackground] = useState();

  useEffect(() => {
    setBackground(getBackground(values));
  }, [values]);

  return (
    <TableComponent
      data={activities}
      columns={[
        {
          name: 'Experiment',
          key: 'experiment',
          width: '20%'
        },
        {
          name: 'Activities',
          key: 'range',
          render: ({ row }) => {
            const foreground = getForeground(row.values);
            return (
              <Canvas className='barcode' canvases={[background, foreground]} />
            );
          },
          width: '25%',
          align: 'center'
        },
        {
          name: '#',
          key: 'activities',
          width: '10%',
          align: 'center'
        },
        {
          name: 'Min',
          key: 'min',
          render: ({ cell }) => (cell || 0).toFixed(5),
          width: '15%'
        },
        {
          name: 'Max',
          key: 'max',
          render: ({ cell }) => (cell || 0).toFixed(5),
          width: '15%'
        },
        {
          name: 'Range',
          key: 'range',
          render: ({ cell }) => (cell || 0).toFixed(5),
          width: '15%'
        }
      ]}
      defaultSortKey='range'
      defaultSortUp={true}
      freezeCol={false}
    />
  );
};

const mapStateToProps = (state) =>
  mapActivities(state.signatures.activities, state);

Table = connect(mapStateToProps)(Table);

export default Table;
