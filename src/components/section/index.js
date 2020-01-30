import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import './index.css';

const Section = ({ text = '', children = <></> }) => {
  const [expanded, setExpanded] = useState(true);

  const onClick = () => setExpanded(!expanded);

  return (
    <>
      <div className='section_header text_medium' onClick={onClick}>
        {text}
      </div>
      <section data-expanded={expanded}>{children}</section>
    </>
  );
};
Section.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string.isRequired
};

export default Section;
