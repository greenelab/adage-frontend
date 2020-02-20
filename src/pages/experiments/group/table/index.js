import React from 'react';
import { connect } from 'react-redux';

import Clickable from '../../../../components/clickable';
import SampleLink from '../../../sample/link';
import TableComponent from '../../../../components/table';
import { groupSample } from '../../../../actions/samples';
import { ungroupSample } from '../../../../actions/samples';
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
              index='diamond'
              color='var(--blue)'
              Icon={DiamondIcon}
            />
            <GroupButton
              sample={cell}
              index='spade'
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
  samples: state.sample.selected.map((sample) => ({
    ...sample,
    groupIndex: isGrouped(state.sample.groups, sample.id)
  }))
});

Table = connect(mapStateToProps)(Table);

export default Table;

let GroupButton = ({ sample, index, color, Icon, group, ungroup }) => {
  const isGrouped = sample.groupIndex === index;
  const defaultColor = 'var(--light-gray)';
  return (
    <Clickable
      icon={<Icon />}
      button
      onClick={() =>
        (isGrouped ? ungroup : group)({ index: index, id: sample.id })
      }
      style={{ color: isGrouped ? color : defaultColor }}
      aria-label={
        isGrouped ? 'Ungroup this sample' : 'Put this sample in group ' + index
      }
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  group: (...args) => dispatch(groupSample(...args)),
  ungroup: (...args) => dispatch(ungroupSample(...args))
});

GroupButton = connect(null, mapDispatchToProps)(GroupButton);
