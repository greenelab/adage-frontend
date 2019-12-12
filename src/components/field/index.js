import React from 'react';
import PropTypes from 'prop-types';
import { Children } from 'react';

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
    if (typeof child === 'string')
      label += child;
    if (typeof child === 'number')
      label += String(child);
  });

  return label;
};
