import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/button';
import Popup from '../../../components/popup';
import Alert from '../../../components/alert';
import List from './list';
import { useBbox } from '../../../util/hooks.js';
import { isArray } from '../../../util/types.js';
import { isString } from '../../../util/types.js';

import { ReactComponent as Model } from '../../../images/model.svg';

import './index.css';

let ModelSelect = ({ models }) => {
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
        {isArray(models) && <List models={models} />}
        {isString(models) && (
          <Alert className='model_alert' status={models} subject='models' />
        )}
      </Popup>
    </>
  );
};

const selector = (state) => ({
  models: isArray(state.model.list) ?
    state.model.list.map((model) => ({
      selected: state.model.selected === model.id,
      id: model.id,
      title: model.title,
      authors: (model.authors || '').split('\n'),
      journal: model.journal,
      year: model.year
    })) :
    state.model.list
});

ModelSelect = connect(selector)(ModelSelect);

export default ModelSelect;
