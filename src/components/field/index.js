import React from 'react';
import PropTypes from 'prop-types';
import { Children } from 'react';
import { isValidElement } from 'react';

import Tooltip from '../tooltip';

import './index.css';

const Field = ({ className, children, wrap, ...props }) => {
  const label = getLabelFromChildren(children);
  return (
    <Tooltip text={label} horizontalAlign='left'>
      <span
        className={'field ' + (wrap ? '' : 'nowrap ') + (className || '')}
        {...props}
      >
        {children}
      </span>
    </Tooltip>
  );
};

Field.propTypes = {
  className: PropTypes.string,
  wrap: PropTypes.bool,
  children: PropTypes.node
};

export default Field;

const getLabelFromChildren = (children) => {
  let label = '';

  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      const cell = child?.props?.cell?.value;
      if (typeof cell === 'number' || typeof cell === 'string')
        label += cell;
    } else if (typeof child === 'number' || typeof child === 'string')
      label += String(child);
  });

  return label;
};
