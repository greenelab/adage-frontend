import React from 'react';

import Clickable from '../../../components/clickable';

import { ReactComponent as ArrowIcon } from '../../../images/arrow.svg';

import './index.css';

// intro section above feature rows

const Banner = () => (
  <section>
    <div className='banner'>
      <div className='size_medium weight_medium'>
        Adage is a tool to help you explore and discover new insights from
        machine learning models
      </div>
      <Clickable to='/genes' text='Jump In' icon={<ArrowIcon />} button />
      <Clickable to='/about' text='Learn More' icon={<ArrowIcon />} button />
    </div>
  </section>
);

export default Banner;
