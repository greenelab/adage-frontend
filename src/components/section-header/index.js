import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const SectionHeader = ({ text = '' }) => (
  <section className='section_header'>{text}</section>
);

SectionHeader.propTypes = {
  text: PropTypes.string.isRequired
};

export default SectionHeader;
