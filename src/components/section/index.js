import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import './index.css';

const Section = ({ header = '', children = <></> }) => {
  const [expanded, setExpanded] = useState(true);

  const onClick = () => setExpanded(!expanded);

  return (
    <>
      <div
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
