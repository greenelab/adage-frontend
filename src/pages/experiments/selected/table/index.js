import React from 'react';
import { connect } from 'react-redux';

import Button from '../../../../components/button';
import SampleLink from '../../../sample/link';
import TableComponent from '../../../../components/table';
import { groupSample } from '../../../../actions/samples';
import { ungroupSample } from '../../../../actions/samples';
import { normalize } from '../../../../util/object';
import { isGrouped } from '../../../../reducers/samples';

import { ReactComponent as DiamondIcon } from '../../../../images/diamond.svg';
import { ReactComponent as SpadeIcon } from '../../../../images/spade.svg';

import './index.css';

// table of samples for selected experiment

let Table = ({ samples }) => (
  <TableComponent
    data={samples}
    columns={[
      {
        name: 'Group',
        value: 'group',
        width: '60px',
        align: 'center',
        padded: false,
        render: (cell) => (
          <>
            <GroupButton
              sample={cell}
              index={1}
              name='Diamond'
              color='var(--blue)'
              Icon={DiamondIcon}
            />
            <GroupButton
              sample={cell}
              index={2}
              name='Spade'
              color='var(--red)'
              Icon={SpadeIcon}
            />
          </>
        )
      },
      {
        name: 'Name',
        value: 'name',
        width: 'calc((100% - 60px) * 0.2)',
        render: (cell) => <SampleLink sample={cell} />
      },
      {
        name: 'Description',
        value: 'description',
        width: 'calc((100% - 60px) * 0.55)'
      },
      {
        name: 'Genotype',
        value: 'genotype',
        width: 'calc((100% - 60px) * 0.15)'
      },
      {
        name: 'Strain',
        value: 'strain',
        width: 'calc((100% - 60px) * 0.10)'
      }
    ]}
  />
);

const mapStateToProps = (state) => ({
  samples: (state.experiment.selected.samples || [])
    .map((sample) => normalize(sample, false, 1))
    .map((sample) => ({
      ...sample,
      group: isGrouped(state.sample.groups, sample.id)
    }))
});

Table = connect(mapStateToProps)(Table);

export default Table;

let GroupButton = ({ sample, index, name, color, Icon, group, ungroup }) => {
  const grouped = sample.group === index;
  const defaultColor = 'var(--light-gray)';
  return (
    <Button
      icon={<Icon />}
      onClick={() =>
        (grouped ? ungroup : group)({ index: index, id: sample.id })
      }
      style={{ color: grouped ? color : defaultColor }}
      aria-label={
        grouped ? 'Ungroup this sample' : 'Put this sample in group ' + name
      }
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  group: (...args) => dispatch(groupSample(...args)),
  ungroup: (...args) => dispatch(ungroupSample(...args))
});

GroupButton = connect(null, mapDispatchToProps)(GroupButton);
