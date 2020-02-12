import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './index.css';

const delay = 250;
const duration = 250;
const padding = 5;

// tooltip singular component

const Tooltip = () => {
  // internal state
  const [anchor, setAnchor] = useState(null);
  const timer = useRef();

  // open tooltip by setting anchor element
  const openTooltip = useCallback((event) => {
    timer.current = window.setTimeout(() => setAnchor(event.target), delay);
  }, []);

  // close tooltip by removing anchor
  const closeTooltip = useCallback(() => {
    window.clearTimeout(timer.current);
    setAnchor(null);
  }, []);

  // when any dom node changes
  const onMutation = useCallback(() => {
    // get all nodes with an aria-label that haven't been processed yet
    // MutationRecord's "addedNodes" doesn't seem to play nice with react
    const nodes = document.querySelectorAll(
      '[aria-label]:not([data-tooltipped])'
    );

    // attach tooltip triggers to each node, and mark as processed
    for (const node of nodes) {
      node.addEventListener('mouseenter', openTooltip);
      node.addEventListener('mouseleave', closeTooltip);
      node.setAttribute('data-tooltipped', 'true');
    }
  }, [openTooltip, closeTooltip]);

  // set up mutation observer to watch for dom node additions/changes
  useEffect(() => {
    const observer = new MutationObserver(onMutation);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    return () => {
      observer.disconnect();
    };
  }, [onMutation]);

  return (
    <>
      <CSSTransition
        in={anchor ? true : false}
        timeout={duration}
        classNames='tooltip'
        unmountOnExit
      >
        <Portal anchor={anchor} />
      </CSSTransition>
    </>
  );
};
export default Tooltip;

// append popup to body, not app root

const Portal = ({ anchor }) =>
  anchor ? (
    createPortal(
      <div className='tooltip text_small' style={computeStyle({ anchor })}>
        {anchor.getAttribute('aria-label') || anchor.innerText}
      </div>,
      document.body
    )
  ) : (
    <></>
  );

const horizontalMargin = 200;
const verticalMargin = 100;

// position tooltip relative to anchor/target

const computeStyle = ({ anchor }) => {
  if (!anchor)
    return {};

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

  let horizontalAlign = 'left';
  let verticalAlign = 'top';

  // if too close to right side of screen, right align
  if (anchorBbox.left > window.innerWidth - horizontalMargin) {
    horizontalAlign = 'right';
    // then, if also too close to left screen, center align
    if (anchorBbox.left < horizontalMargin)
      horizontalAlign = 'center';
  }

  // if too close to top of screen, bottom align
  if (anchorBbox.top < verticalMargin)
    verticalAlign = 'bottom';

  // calculate horizontal position
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

  // calculate vertical position
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
