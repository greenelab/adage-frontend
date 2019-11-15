import React from 'react';
import PropTypes from 'prop-types';

import LinkTextIcon from '../../../components/link-text-icon';

import { ReactComponent as Arrow } from '../../../images/arrow.svg';

import './index.css';

const Banner = ({ text }) => (
  <section>
    <div className='banner text_medium semibold'>{text}</div>
    <LinkTextIcon to='/genes' text='Explore' icon={<Arrow />} />
  </section>
);

Banner.propTypes = {
  text: PropTypes.string.isRequired
};

export default Banner;
