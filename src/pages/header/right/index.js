import React from 'react';

import ModelSelect from '../model-select';

import Link from '../../../components/link';

import { ReactComponent as HelpIcon } from '../../../images/help.svg';

import './index.css';

// model select and help button

const Right = () => (
  <div className='page_header_column'>
    <ModelSelect />
    <Link
      to='/help'
      newTab
      icon={<HelpIcon />}
      aria-label='View help documentation for this page'
    />
  </div>
);

export default Right;
