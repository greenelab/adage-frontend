import React from 'react';

import ModelSelect from '../model-select';

import Clickable from '../../../components/clickable';

import { ReactComponent as AboutIcon } from '../../../images/about.svg';

import './index.css';

// model select and help button

const Right = () => (
  <div className='page_header_column'>
    <ModelSelect />
    <Clickable
      to='/about'
      icon={<AboutIcon />}
      button
      aria-label='About'
      data-tooltip-h-align='right'
      data-tooltip-v-align='bottom'
    />
  </div>
);

export default Right;
