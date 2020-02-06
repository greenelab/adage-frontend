import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '../tooltip';
import { useInnerText } from '../../util/hooks';

import './index.css';

// wrapper for text that truncates with ellipses and automatically provides
// tooltip so users can read full text on hover

const Field = ({ className, children, wrap, ...props }) => {
  const [label, ref] = useInnerText();

  return (
    <Tooltip text={label}>
      <span
        ref={ref}
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
