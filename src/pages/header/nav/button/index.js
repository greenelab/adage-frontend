import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import Clickable from '../../../../components/clickable';

import './index.css';

// header navigation bar button

const Button = ({ icon = <></>, text = '' }) => {
  const location = useLocation();

  return (
    <Clickable
      className='nav_button text_medium'
      to={'/' + text.toLowerCase()}
      icon={icon}
      text={text}
      flip
      data-active={location.pathname.toLowerCase().includes(text.toLowerCase())}
    />
  );
};

Button.propTypes = {
  location: PropTypes.object,
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired
};

export default Button;
