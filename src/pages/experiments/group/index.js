import React from 'react';
import { connect } from 'react-redux';

import Clickable from '../../../components/clickable';
import { groupSample } from '../../../actions/samples';
import { ungroupSample } from '../../../actions/samples';
import { groupIndex } from '../../../reducers/samples';

import { ReactComponent as DiamondIcon } from '../../../images/diamond.svg';
import { ReactComponent as SpadeIcon } from '../../../images/spade.svg';

// group button component, shared across sections of experiments page

export const GroupButtons = ({ sample }) => (
  <div>
    <GroupButton
      sample={sample}
      index='diamond'
      color='var(--blue)'
      Icon={DiamondIcon}
    />
    <GroupButton
      sample={sample}
      index='spade'
      color='var(--red)'
      Icon={SpadeIcon}
    />
  </div>
);

let GroupButton = ({
  sample,
  groupIndex,
  index,
  color,
  Icon,
  group,
  ungroup
}) => {
  const isGrouped = groupIndex === index;
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

const mapStateToProps = (state, props) => ({
  groupIndex: groupIndex(state.samples.groups, props.sample.id)
});

const mapDispatchToProps = (dispatch) => ({
  group: (...args) => dispatch(groupSample(...args)),
  ungroup: (...args) => dispatch(ungroupSample(...args))
});

GroupButton = connect(mapStateToProps, mapDispatchToProps)(GroupButton);

export { GroupButton };
