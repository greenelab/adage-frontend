import React from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import { OrderContext } from '../../order';
import { GroupButtons } from '../../group';
import { groupSample } from '../../../../actions/samples';
import { getGroupIndex } from '../../../../reducers/samples';
import SampleLink from '../../../sample/link';
import TableComponent from '../../../../components/table';
import { sort } from '../../../../util/object';

import './index.css';

// table of samples for selected experiment

let Table = ({ samples, group }) => {
  const [start, setStart] = useState(null);
  const { sampleOrder, changeSampleOrder, tableRef } = useContext(OrderContext);

  const sortedSamples = useMemo(() => sort(samples, sampleOrder, 'id'), [
    sampleOrder,
    samples
  ]);

  return (
    <TableComponent
      ref={tableRef}
      data={sortedSamples}
      columns={[
        {
          name: 'Group',
          key: 'groupIndex',
          render: ({ row, rowIndex, getRange }) => (
            <GroupButtons
              sample={row}
              onClick={(event, groupIndex) => {
                if (!event.shiftKey || !start)
                  setStart({ rowIndex, groupIndex });
                else {
                  group({
                    index: groupIndex,
                    ids: getRange(start.rowIndex, rowIndex).map(
                      (sample) => sample.id
                    )
                  });
                }
              }}
            />
          ),
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
      maxHeight='calc((12 * 30px) + ((12 - 1) * 1px))'
      onSort={(data) => {
        changeSampleOrder(data.map((d) => d.id));
        setStart(null);
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  samples: state.samples.selected.map((sample) => ({
    ...sample,
    groupIndex: getGroupIndex(state.samples.groups, sample.id)
  }))
});

const mapDispatchToProps = (dispatch) => ({
  group: (...args) => dispatch(groupSample(...args))
});

Table = connect(mapStateToProps, mapDispatchToProps)(Table);

export default Table;
