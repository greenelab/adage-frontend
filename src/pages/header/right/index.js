import React from 'react';

import ModelSelect from '../model-select';

import Clickable from '../../../components/clickable';

import { ReactComponent as HelpIcon } from '../../../images/help.svg';

import './index.css';

// model select and help button

const Right = () => (
  <div className='page_header_column'>
    <ModelSelect />
    <Clickable
      to='/help'
      icon={<HelpIcon />}
      button
      aria-label='View help documentation for this page'
    />
  </div>
);

export default Right;
