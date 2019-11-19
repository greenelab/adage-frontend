import React from 'react';
import { useState } from 'react';

import Button from '../../../components/button';
import Popup from '../../../components/popup';
import ModelItem from '../../../components/model-item';
import { useBbox } from '../../../util/hooks.js';

import { ReactComponent as Model } from '../../../images/model.svg';

import './index.css';

const ModelSelect = () => {
  const [buttonBbox, buttonRef] = useBbox();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        ref={buttonRef}
        className='model_select_button'
        onClick={() => setIsOpen(!isOpen)}
      >
        <Model />
      </Button>
      <Popup
        isOpen={isOpen}
        anchorBbox={buttonBbox}
        className='model_select_popup'
        close={() => setIsOpen(false)}
      >
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
