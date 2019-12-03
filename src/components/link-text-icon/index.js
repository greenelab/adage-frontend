import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './index.css';

const LinkTextIcon = ({
  to,
  newTab,
  text = '',
  icon = <></>,
  className = '',
  ...props
}) => (
  <Link
    className={'link_text_icon ' + className}
    target={newTab ? '_blank' : undefined}
    to={to}
    {...props}
  >
    <span>{text}</span>
    {icon}
  </Link>
);

LinkTextIcon.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  className: PropTypes.string
};

export default LinkTextIcon;
