import React from 'react';
import PropTypes from 'prop-types';
import { Children } from 'react';
import { isValidElement } from 'react';
import { cloneElement } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { createPortal } from 'react-dom';

import './index.css';

const delay = 100;
const padding = 5;

const Tooltip = ({
  children,
  text = '',
  horizontalAlign = 'center',
  verticalAlign = 'top'
}) => {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState(null);
  const [anchor, setAnchor] = useState(null);
  const [style, setStyle] = useState({});

  const onEnter = (event) => {
    setAnchor(event.target);
    setHover(true);
  };
  const onLeave = () => {
    setAnchor(null);
    setHover(false);
  };

  useEffect(() => {
    if (hover) {
      setTimer(
        window.setTimeout(() => {
          setOpen(true);
        }, delay)
      );
    } else
      setTimer(null);
  }, [hover]);

  useEffect(() => {
    if (open && !hover)
      setOpen(false);
  }, [open, hover]);

  useEffect(() => {
    if (timer === null)
      window.clearTimeout(timer);

    return () => window.clearTimeout(timer);
  }, [timer]);

  const onResize = useCallback(() => {
    if (anchor)
      setStyle(computeStyle({ anchor, horizontalAlign, verticalAlign }));
  }, [anchor, horizontalAlign, verticalAlign]);

  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [onResize]);

  children = Children.map(children, (element) => {
    if (isValidElement(element)) {
      return cloneElement(element, {
        'onMouseEnter': (...args) => {
          if (element.onMouseEnter)
            element.onMouseEnter(...args);
          onEnter(...args);
        },
        'onMouseLeave': (...args) => {
          if (element.onMouseLeave)
            element.onMouseLeave(...args);
          onLeave(...args);
        },
        'onFocus': (...args) => {
          if (element.onFocus)
            element.onFocus(...args);
          onEnter(...args);
        },
        'onBlur': (...args) => {
          if (element.onBlur)
            element.onBlur(...args);
          onLeave(...args);
        },
        'aria-label': text
      });
    } else if (typeof element === 'string') {
      return (
        <span
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          onFocus={onEnter}
          onBlur={onLeave}
        >
          {element}
        </span>
      );
    } else
      return element;
  });

  return (
    <>
      {children}
      {open && <Portal text={text} style={style} />}
    </>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string.isRequired,
  horizontalAlign: PropTypes.string,
  verticalAlign: PropTypes.string
};

export default Tooltip;

const Portal = ({ text, style }) => {
  return createPortal(
    <div className='tooltip text_small' style={style}>
      {text}
    </div>,
    document.body
  );
};

const computeStyle = ({ anchor, horizontalAlign, verticalAlign }) => {
  const anchorBbox = anchor.getBoundingClientRect();
  const bodyBbox = document.body.getBoundingClientRect();
  const bbox = {
    left: anchorBbox.left - bodyBbox.left,
    top: anchorBbox.top - bodyBbox.top,
    right: bodyBbox.right - (anchorBbox.left + anchorBbox.width),
    bottom: bodyBbox.bottom - (anchorBbox.top + anchorBbox.height),
    width: anchorBbox.width,
    height: anchorBbox.height
  };
  const style = {};

  switch (horizontalAlign) {
    case 'center':
      style.left = bbox.left + bbox.width / 2 + 'px';
      style.transform = 'translateX(-50%)';
      break;

    case 'left':
      style.left = bbox.left + 'px';
      break;

    case 'right':
      style.right = bbox.right + 'px';
      break;

    default:
      break;
  }

  switch (verticalAlign) {
    case 'top':
      style.bottom = bbox.bottom + bbox.height + padding + 'px';
      break;

    case 'bottom':
      style.top = bbox.top + bbox.height + padding + 'px';
      break;

    default:
      break;
  }

  return style;
};
