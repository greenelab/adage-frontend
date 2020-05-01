import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import TableComponent from '../../../../components/table';
import Canvas from '../../../../components/canvas';
import Clickable from '../../../../components/clickable';
import ExperimentLink from '../../../experiment/link';
import SampleLink from '../../../sample/link';
import { getBackground } from './barcode';
import { getForeground } from './barcode';
import { mapActivities } from '../';
import { isArray } from '../../../../util/types';

import { ReactComponent as ExperimentIcon } from '../../../../images/experiment.svg';
import { ReactComponent as ArrowIcon } from '../../../../images/arrow.svg';

import './index.css';

// table of signature activities

let Table = ({ bySignature = {}, byExperiment = [], sampleList }) => {
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
                <button
                  className='barcode_button'
                  onClick={() => setSelected(row.accession)}
                >
                  <Canvas
                    className='barcode'
                    canvases={[background, foreground]}
                    aria-label='See individual sample activities'
                    data-tooltip-h-align='center'
                  />
                </button>
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
            width: '14%'
          },
          {
            name: 'Max',
            key: 'max',
            width: '14%'
          },
          {
            name: 'Range',
            key: 'range',
            width: '14%'
          }
        ]}
        minWidth='600px'
        defaultSortKey='range'
        defaultSortUp={true}
        freezeCol={false}
      />
    );
  } else {
    // get full details of selected experiment
    const experiment = byExperiment.find(
      (experiment) => experiment.accession === selected
    );

    let samples = experiment?.samples || [];

    // fill in full details of experiment samples from sample list
    if (isArray(sampleList)) {
      samples = samples.map((sample) => ({
        ...sample,
        ...(sampleList.find((full) => full.id === sample.id) || {})
      }));
    }

    return (
      <>
        <div className='info weight_medium'>
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
          data={samples}
          columns={[
            {
              name: 'Sample',
              key: 'name',
              render: ({ row }) => <SampleLink sample={row} />,
              width: '25%'
            },
            {
              name: 'Description',
              key: 'description',
              width: '50%'
            },
            {
              name: 'Activity',
              key: 'value',
              width: '25%'
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

const mapStateToProps = (state) => ({
  ...mapActivities(state.signatures.activities, state),
  sampleList: state.samples.list
});

Table = connect(mapStateToProps)(Table);

export default Table;
