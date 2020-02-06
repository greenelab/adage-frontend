import React from 'react';

import ModelSelect from '../model-select';

import Tooltip from '../../../components/tooltip';
import Link from '../../../components/link';

import { ReactComponent as HelpIcon } from '../../../images/help.svg';

import './index.css';

// model select and help button

const Right = () => (
  <div className='page_header_column'>
    <ModelSelect />
    <Tooltip text='View help documentation for this page'>
      <Link to='/help' newTab icon={<HelpIcon />} />
    </Tooltip>
  </div>
);

export default Right;
