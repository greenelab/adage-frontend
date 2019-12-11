import React from 'react';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import './index.css';

let Button = (props, ref) => {
  const { text, icon, flip = false, children, ...rest } = props;

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
    <button
      ref={ref}
      {...rest}
      data-text={text !== undefined}
      data-icon={icon !== undefined}
    >
      {content}
    </button>
  );
};
Button = forwardRef(Button);

Button.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.element,
  flip: PropTypes.bool,
  children: PropTypes.node
};

export default Button;
