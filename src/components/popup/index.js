import React from 'react';
import { createPortal } from 'react-dom';

import { useBbox } from '../../util/hooks.js';

import './index.css';

const distance = 5;
const screenWidth = 600;

const Portal = ({ anchorBbox, className, close, children, ...props }) => {
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

  if (popupBbox && window.innerWidth < screenWidth)
    x = window.innerWidth / 2 - popupBbox.width / 2;

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

export default Popup;
