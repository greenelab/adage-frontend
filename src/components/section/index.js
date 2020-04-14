import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import PropTypes from 'prop-types';

import './index.css';

// collapsible section with header button

const Section = ({ header = '', children = <></> }) => {
  const [expanded, setExpanded] = useState(true);
  const ref = useRef();

  const onClick = useCallback(() => setExpanded(!expanded), [expanded]);

  const onKeyDown = useCallback(
    (event) => {
      if (!ref.current)
        return;

      // find which number section this is on page
      // eg 1st, 2nd, 3rd, etc.
      const number =
        [...document.querySelectorAll('.section_header')].findIndex(
          (section) => section === ref.current
        ) + 1;

      // if number key pressed matches section number, continue
      if (event.key !== String(number))
        return;

      // hold alt to toggle expanded
      if (event.altKey)
        onClick();
      // otherwise, scroll section into view
      else
        ref.current.scrollIntoView();
    },
    [onClick]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <>
      <div
        ref={ref}
        className='section_header text_medium'
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onClick();
          }
        }}
        onClick={onClick}
        tabIndex='0'
      >
        {header}
      </div>
      <section data-expanded={expanded}>{children}</section>
    </>
  );
};

Section.propTypes = {
  children: PropTypes.node,
  header: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired
};

export default Section;
