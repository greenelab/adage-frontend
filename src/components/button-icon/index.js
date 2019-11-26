import React from 'react';
import PropTypes from 'prop-types';

import Button from '../button';

import './index.css';

const ButtonIcon = ({ icon = <></>, className = '', ...props }) => (
  <Button className={'button_icon ' + className} {...props}>
    {icon}
  </Button>
);

ButtonIcon.propTypes = {
  icon: PropTypes.element.isRequired,
  className: PropTypes.string
};

export default ButtonIcon;
