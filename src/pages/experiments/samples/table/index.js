import React from 'react';
import { useMemo } from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { OrderContext } from '../../order';
import { GroupButtons } from '../../group';
import { groupIndex } from '../../../../reducers/samples';
import SampleLink from '../../../sample/link';
import TableComponent from '../../../../components/table';
import { sort } from '../../../../util/object';

import './index.css';

// table of samples for selected experiment

let Table = ({ samples }) => {
  const { sampleOrder, changeSampleOrder } = useContext(
    OrderContext
  );

  const sortedSamples = useMemo(() => sort(samples, sampleOrder, 'id'), [
    sampleOrder,
    samples
  ]);

  return (
    <TableComponent
      data={sortedSamples}
      columns={[
        {
          name: 'Group',
          key: 'groupIndex',
          render: ({ row }) => <GroupButtons sample={row} />,
          width: '60px',
          align: 'center',
          padded: false
        },
        {
          name: 'Name',
          key: 'name',
          render: ({ row }) => <SampleLink sample={row} />,
          width: 'calc((100% - 60px) * 0.25)'
        },
        {
          name: 'Description',
          key: 'description',
          width: 'calc((100% - 60px) * 0.50)'
        },
        {
          name: 'Genotype',
          key: 'genotype',
          width: 'calc((100% - 60px) * 0.15)',
          align: 'center'
        },
        {
          name: 'Strain',
          key: 'strain',
          width: 'calc((100% - 60px) * 0.10)',
          align: 'center'
        }
      ]}
      minWidth='500px'
      onSort={(data) => changeSampleOrder(data.map((d) => d.id))}
    />
  );
};

const mapStateToProps = (state) => ({
  samples: state.samples.selected.map((sample) => ({
    ...sample,
    groupIndex: groupIndex(state.samples.groups, sample.id)
  }))
});

Table = connect(mapStateToProps)(Table);

export default Table;
