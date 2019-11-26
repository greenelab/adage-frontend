import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import { useBbox } from '../../util/hooks.js';

import './index.css';

const distance = 5;
const padding = 20;

const Portal = ({
  anchorBbox = {},
  className = '',
  close = () => null,
  children,
  ...props
}) => {
  const [popupBbox, popupRef] = useBbox();

  let x = -99999;
  let y = -99999;

  if (popupBbox) {
    x = popupBbox.left;
    y = popupBbox.top;
  }

  if (anchorBbox && popupBbox) {
    x = anchorBbox.right - popupBbox.width;
    y = anchorBbox.bottom + distance;
  }

  if (popupBbox) {
    if (x > window.innerWidth - padding)
      x = window.innerWidth - padding;
    if (x < padding)
      x = padding;
  }

  return (
    <div className='popup_overlay' onClick={close}>
      <div
        ref={popupRef}
        className={'popup_content ' + className}
        {...props}
        onClick={(event) => event.stopPropagation()}
        style={{ left: x, top: y }}
      >
        {children}
      </div>
    </div>
  );
};

const Popup = ({ isOpen, ...props }) => {
  if (isOpen)
    return createPortal(<Portal {...props} />, document.body);
  else
    return <></>;
};

Popup.propTypes = {
  anchorBbox: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
  close: PropTypes.func
};

export default Popup;
