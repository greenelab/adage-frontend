import React from 'react';
import PropTypes from 'prop-types';

import Link from '../../../components/link';

import { ReactComponent as ArrowIcon } from '../../../images/arrow.svg';

import './index.css';

// intro section above feature rows

const Banner = ({ text }) => (
  <section>
    <div className='banner'>
      <div className='text_medium medium'>{text}</div>
      <Link to='/genes' text='Explore' icon={<ArrowIcon />} />
    </div>
  </section>
);

Banner.propTypes = {
  text: PropTypes.string.isRequired
};

export default Banner;
