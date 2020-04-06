import React from 'react';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

import { isString } from '../../util/types';
import { isExternalLink } from '../../util/string';

import './index.css';

// general purpose button/link

let Clickable = (props, ref) => {
  // link - whether to style clickable as a link
  // button - whether to style clickable as a button (w/ or w/o text)
  // text - provided text (string or react element)
  // icon - provided icon
  let {
    className = '',
    link,
    button,
    text,
    icon,
    flip = false,
    to,
    search = {},
    newTab = false,
    children,
    ...rest
  } = props;

  if (text && icon && isString(text))
    text = <span>{text}</span>;

  let content = <></>;
  if (flip) {
    content = (
      <>
        {icon}
        {text}
      </>
    );
  } else {
    content = (
      <>
        {text}
        {icon}
      </>
    );
  }

  let Component;
  if (to) {
    if (isExternalLink(to))
      Component = ExternalLink;
    else
      Component = LocalLink;
  } else
    Component = Button;

  return (
    <Component
      {...rest}
      ref={ref}
      className={'clickable ' + (link ? 'nowrap ' : '') + className}
      target={newTab ? '_blank' : undefined}
      to={to}
      search={search}
      href={to}
      data-link={link ? true : false}
      data-button={button ? true : false}
      data-text={text ? true : false}
      data-icon={icon ? true : false}
    >
      {content}
    </Component>
  );
};

Clickable = forwardRef(Clickable);

Clickable.propTypes = {
  className: PropTypes.string,
  link: PropTypes.bool,
  button: PropTypes.bool,
  text: PropTypes.node,
  icon: PropTypes.node,
  flip: PropTypes.bool,
  to: PropTypes.string,
  search: PropTypes.object,
  newTab: PropTypes.bool,
  children: PropTypes.node
};

export default Clickable;

let LocalLink = (props, ref) => {
  const { to, search, ...rest } = props;
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  for (const [key, value] of Object.entries(search))
    params.set(key, value);

  return (
    <Link
      ref={ref}
      to={{ pathname: to, search: '?' + params.toString() }}
      {...rest}
    />
  );
};

let ExternalLink = (props, ref) => {
  const { children, ...rest } = props;
  return (
    <a ref={ref} {...rest}>
      {children}
    </a>
  );
};

let Button = (props, ref) => <button ref={ref} {...props} />;

LocalLink = forwardRef(LocalLink);
ExternalLink = forwardRef(ExternalLink);
Button = forwardRef(Button);
