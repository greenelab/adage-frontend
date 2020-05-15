import React from 'react';
import { useContext } from 'react';
import { connect } from 'react-redux';

import Clickable from '../../../components/clickable';
import { groupSample } from '../../../actions/samples';
import { ungroupSample } from '../../../actions/samples';
import { getGroupIndex } from '../../../reducers/samples';
import { OrderContext } from '../order';

import { ReactComponent as DiamondIcon } from '../../../images/diamond.svg';
import { ReactComponent as SpadeIcon } from '../../../images/spade.svg';

// group button component, shared across sections of experiments page

export const GroupButtons = ({ sample, onClick }) => (
  <div>
    <GroupButton
      sample={sample}
      buttonGroupIndex='diamond'
      color='var(--blue)'
      Icon={DiamondIcon}
      onClick={onClick}
    />
    <GroupButton
      sample={sample}
      buttonGroupIndex='spade'
      color='var(--red)'
      Icon={SpadeIcon}
      onClick={onClick}
    />
  </div>
);

let GroupButton = ({
  sample,
  sampleGroupIndex,
  buttonGroupIndex,
  color,
  Icon,
  group,
  ungroup,
  onClick = () => null
}) => {
  const { resetTableSort } = useContext(OrderContext);
  const isGrouped = sampleGroupIndex === buttonGroupIndex;
  const defaultColor = 'var(--light-gray)';
  return (
    <Clickable
      icon={<Icon />}
      button
      onClick={(event) => {
        if (!event.shiftKey) {
          if (isGrouped)
            ungroup({ index: buttonGroupIndex, id: sample.id });
          else
            group({ index: buttonGroupIndex, id: sample.id });
        }
        onClick(event, buttonGroupIndex);
        resetTableSort();
      }}
      style={{ color: isGrouped ? color : defaultColor }}
      aria-label={
        isGrouped ?
          'Ungroup this sample' :
          'Put this sample in group ' + buttonGroupIndex
      }
    />
  );
};

const mapStateToProps = (state, props) => ({
  sampleGroupIndex: getGroupIndex(state.samples.groups, props.sample.id)
});

const mapDispatchToProps = (dispatch) => ({
  group: (...args) => dispatch(groupSample(...args)),
  ungroup: (...args) => dispatch(ungroupSample(...args))
});

GroupButton = connect(mapStateToProps, mapDispatchToProps)(GroupButton);

export { GroupButton };
