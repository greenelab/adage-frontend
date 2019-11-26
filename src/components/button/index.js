import React from 'react';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import './index.css';

let Button = (props, ref) => <button ref={ref} {...props}></button>;
Button = forwardRef(Button);

Button.propTypes = {
  children: PropTypes.node
};

export default Button;
