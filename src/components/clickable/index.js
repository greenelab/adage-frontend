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
      className={'clickable ' + className}
      target={newTab ? '_blank' : undefined}
      to={to}
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
  newTab: PropTypes.bool,
  children: PropTypes.node
};

export default Clickable;

let LocalLink = (props, ref) => {
  const { to, ...rest } = props;
  const location = useLocation();
  return (
    <Link ref={ref} to={{ pathname: to, search: location.search }} {...rest} />
  );
};

let ExternalLink = (props, ref) => {
  const { children, ...rest } = props;
  return (
    <a ref={ref} {...rest}>
      {children}
      <span style={{ position: 'fixed', left: '-100000px', top: '-100000px' }}>
        {rest['aria-label'] || 'button'}
      </span>
    </a>
  );
};

let Button = (props, ref) => <button ref={ref} {...props} />;

LocalLink = forwardRef(LocalLink);
ExternalLink = forwardRef(ExternalLink);
Button = forwardRef(Button);
