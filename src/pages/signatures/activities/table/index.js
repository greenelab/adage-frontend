import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import TableComponent from '../../../../components/table';
import Canvas from '../../../../components/canvas';
import ExperimentLink from '../../../experiment/link';
import SampleLink from '../../../sample/link';
import { getBackground } from './barcode';
import { getForeground } from './barcode';
import { mapActivities } from '../';

import { ReactComponent as ExperimentIcon } from '../../../../images/experiment.svg';
import { ReactComponent as ArrowIcon } from '../../../../images/arrow.svg';

import './index.css';
import Clickable from '../../../../components/clickable';

// table of signature activities

let Table = ({ bySignature = {}, byExperiment = [] }) => {
  const [background, setBackground] = useState();
  const [selected, setSelected] = useState('');

  const { values, min, max } = bySignature;

  useEffect(() => {
    setBackground(getBackground(values, min, max));
  }, [values, max, min]);

  if (!selected) {
    return (
      <TableComponent
        data={byExperiment}
        columns={[
          {
            name: 'Experiment',
            key: 'accession',
            render: ({ row }) => <ExperimentLink experiment={row} />,
            width: '20%'
          },
          {
            name: 'Activities',
            key: 'range',
            render: ({ row }) => {
              const foreground = getForeground(row.values, min, max);
              return (
                <Canvas
                  className='barcode'
                  canvases={[background, foreground]}
                  onClick={() => setSelected(row.accession)}
                  aria-label='See individual sample activities'
                  data-tooltip-h-align='center'
                />
              );
            },
            width: '30%',
            align: 'center'
          },
          {
            name: '#',
            key: 'count',
            width: '8%',
            align: 'center'
          },
          {
            name: 'Min',
            key: 'min',
            render: ({ cell }) => (cell || 0).toFixed(5),
            width: '14%'
          },
          {
            name: 'Max',
            key: 'max',
            render: ({ cell }) => (cell || 0).toFixed(5),
            width: '14%'
          },
          {
            name: 'Range',
            key: 'range',
            render: ({ cell }) => (cell || 0).toFixed(5),
            width: '14%'
          }
        ]}
        defaultSortKey='range'
        defaultSortUp={true}
        freezeCol={false}
      />
    );
  } else {
    const experiment = byExperiment.find(
      (experiment) => experiment.accession === selected
    );
    return (
      <>
        <div className='info medium'>
          <span>
            <Clickable
              icon={<ArrowIcon className='flip_horizontal' />}
              text='Back to all experiments'
              onClick={() => setSelected('')}
              button
              flip
            />
          </span>
          <span>
            <ExperimentIcon />
            <ExperimentLink experiment={experiment} />
          </span>
        </div>
        <TableComponent
          data={experiment?.samples}
          columns={[
            {
              name: 'Sample',
              key: 'name',
              render: ({ row }) => <SampleLink sample={row} />,
              width: '50%'
            },
            {
              name: 'Activity',
              key: 'value',
              width: '50%'
            }
          ]}
          defaultSortKey='value'
          defaultSortUp={true}
          freezeCol={false}
        />
      </>
    );
  }
};

const mapStateToProps = (state) =>
  mapActivities(state.signatures.activities, state);

Table = connect(mapStateToProps)(Table);

export default Table;
