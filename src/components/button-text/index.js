import React from 'react';
import PropTypes from 'prop-types';

import Button from '../button';

import './index.css';

const ButtonText = ({ text = '', className = '', ...props }) => (
  <Button className={'button_text ' + className} {...props}>
    <span>{text}</span>
  </Button>
);

ButtonText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default ButtonText;
