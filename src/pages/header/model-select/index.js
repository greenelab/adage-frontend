import React from 'react';

import Button from '../../../components/button';
import Popup from '../../../components/popup';
import ModelItem from '../../../components/model-item';
import { useBbox } from '../../../util/hooks.js';

import { ReactComponent as Model } from '../../../images/model.svg';

import './index.css';

const ModelSelect = () => {
  const [buttonBbox, buttonRef] = useBbox();

  return (
    <>
      <Button ref={buttonRef} className='model_select_button'>
        <Model />
      </Button>
      <Popup anchorBbox={buttonBbox} className='model_select_popup'>
        <ModelItem />
        <hr />
        <ModelItem />
        <hr />
        <ModelItem />
        <hr />
        <ModelItem />
        <hr />
        <ModelItem />
      </Popup>
    </>
  );
};

export default ModelSelect;
