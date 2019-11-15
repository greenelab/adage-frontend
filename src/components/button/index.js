import React from 'react';
import { forwardRef } from 'react';

import './index.css';

const Button = forwardRef((props, ref) => {
  const { children, ...rest } = props;
  return (
    <button ref={ref} {...rest}>
      {children}
    </button>
  );
});

export default Button;
