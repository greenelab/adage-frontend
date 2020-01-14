import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Link from '../../../../components/link';

import './index.css';

let Button = ({ location = {}, icon = <></>, text = '' }) => (
  <Link
    className='nav_button text_medium'
    to={text.toLowerCase()}
    icon={icon}
    text={text}
    flip
    overrideTextStyles
    data-active={location.pathname.includes(text.toLowerCase())}
  />
);

Button.propTypes = {
  location: PropTypes.object,
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired
};

Button = withRouter(Button);

export default Button;
