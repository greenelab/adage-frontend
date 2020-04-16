import React from 'react';
import PropTypes from 'prop-types';

import Clickable from '../../../components/clickable';

import { ReactComponent as ArrowIcon } from '../../../images/arrow.svg';

import './index.css';

// intro section above feature rows

const Banner = ({ text }) => (
  <section>
    <div className='banner'>
      <div className='size_medium weight_medium'>{text}</div>
      <Clickable to='/genes' text='Explore' icon={<ArrowIcon />} button />
    </div>
  </section>
);

Banner.propTypes = {
  text: PropTypes.string.isRequired
};

export default Banner;
