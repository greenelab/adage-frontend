import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import './index.css';

let Link = ({
  location,
  match,
  history,
  staticContext,
  to = '',
  newTab = false,
  className = '',
  text,
  icon,
  button = true,
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
      className={
        'clickable nowrap ' + (!icon ? 'field nowrap' : '') + ' ' + className
      }
      target={newTab ? '_blank' : undefined}
      to={{ pathname: to, search: location.search }}
      data-button={button}
      data-text={text !== undefined}
      data-icon={icon !== undefined}
      {...props}
    >
      {content}
    </RouterLink>
  );
};

Link = withRouter(Link);

Link.propTypes = {
  to: PropTypes.string.isRequired,
  newTab: PropTypes.bool,
  className: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.element,
  button: PropTypes.bool,
  flip: PropTypes.bool,
  children: PropTypes.node
};

export default Link;