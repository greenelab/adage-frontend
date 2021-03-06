import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import './index.css';

const distance = 10;

// popup component

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

// append popup to body, not app root

const Portal = ({
  anchorBbox = {},
  className = '',
  close = () => null,
  children,
  ...props
}) => (
  <>
    <div className='popup_overlay' onClick={close}></div>
    <div
      {...props}
      className={'popup_content ' + className}
      onClick={(event) => event.stopPropagation()}
      style={{
        right: window.innerWidth - anchorBbox.rightAbsolute || 0,
        top: anchorBbox.bottomAbsolute + distance || 0
      }}
    >
      {children}
    </div>
  </>
);
