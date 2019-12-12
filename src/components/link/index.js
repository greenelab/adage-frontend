import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import './index.css';

const Link = ({
  to = '',
  newTab = false,
  className = '',
  text,
  overrideTextStyles = false,
  icon,
  flip = false,
  children,
  ...props
}) => {
  let content = <></>;
  if (children)
    content = children;
  else {
    if (flip) {
      content = (
        <>
          {icon}
          {text && <span>{text}</span>}
        </>
      );
    } else {
      content = (
        <>
          {text && <span>{text}</span>}
          {icon}
        </>
      );
    }
  }

  return (
    <RouterLink
      className={'link ' + className}
      // target={newTab ? '_blank' : undefined}
      to={to}
      data-text={text !== undefined && !overrideTextStyles}
      data-icon={icon !== undefined}
      {...props}
    >
      {content}
    </RouterLink>
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  newTab: PropTypes.bool,
  className: PropTypes.string,
  text: PropTypes.string,
  overrideTextStyles: PropTypes.bool,
  icon: PropTypes.element,
  flip: PropTypes.bool,
  children: PropTypes.node
};

export default Link;
