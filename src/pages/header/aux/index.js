import React from 'react';

import Button from '../../../components/button';
import LinkIcon from '../../../components/link-icon';

import { ReactComponent as Model } from '../../../images/model.svg';
import { ReactComponent as Help } from '../../../images/help.svg';

import './index.css';

const Aux = () => (
  <div className='page_header_column'>
    <Button className='model_switch_button'>
      <Model />
    </Button>
    <LinkIcon to='help' icon={<Help />} />
  </div>
);

export default Aux;
