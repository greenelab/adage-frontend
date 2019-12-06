import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import './index.css';

let Button = ({ location = {}, icon = <></>, text = '' }) => (
  <Link
    className='nav_button text_medium'
    to={'/' + text.toLowerCase()}
    data-active={location.pathname === '/' + text.toLowerCase()}
  >
    {icon}
    {text}
  </Link>
);

Button.propTypes = {
  location: PropTypes.object,
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired
};

Button = withRouter(Button);

export default Button;
