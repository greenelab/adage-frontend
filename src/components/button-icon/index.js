import React from 'react';

import Button from '../button';

import './index.css';

const ButtonIcon = ({ children, className, ...props }) => (
  <Button className={'button_icon ' + className} {...props}>
    {children}
  </Button>
);

export default ButtonIcon;
