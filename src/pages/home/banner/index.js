import React from 'react';
import PropTypes from 'prop-types';

import Link from '../../../components/link';

import { ReactComponent as Arrow } from '../../../images/arrow.svg';

import './index.css';

const Banner = ({ text }) => (
  <section>
    <div className='banner text_medium medium'>{text}</div>
    <Link to='/genes' text='Explore' icon={<Arrow />} />
  </section>
);

Banner.propTypes = {
  text: PropTypes.string.isRequired
};

export default Banner;
