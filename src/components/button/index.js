import React from 'react';

import './index.css';

const Button = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

export default Button;
