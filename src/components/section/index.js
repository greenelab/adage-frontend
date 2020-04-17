import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import PropTypes from 'prop-types';

import './index.css';

// collapsible section with header button

const Section = ({ header = '', children = <></> }) => {
  // internal state
  const [number, setNumber] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const ref = useRef();

  const onClick = useCallback(() => setExpanded(!expanded), [expanded]);

  const onKeyDown = useCallback(
    (event) => {
      // if component hasn't mounted yet, exit
      if (!ref.current)
        return;

      // if can't find number of section, exit
      if (!number)
        return;

      // if an element is focused (like an input box), exit
      if (document.activeElement !== document.body)
        return;

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
    [number, onClick]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <>
      <div
        ref={(element) => {
          // find which number section this is on page
          // eg 1st, 2nd, 3rd, etc.
          setNumber(
            [...document.querySelectorAll('.section_header')].findIndex(
              (section) => section === element
            ) + 1
          );
          ref.current = element;
        }}
        className='section_header size_medium'
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onClick();
          }
        }}
        onClick={onClick}
        tabIndex='0'
        aria-label={`Press ${number} to jump here. Click or press alt + ${number} to open/close.`}
        data-tooltip-h-align='center'
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
