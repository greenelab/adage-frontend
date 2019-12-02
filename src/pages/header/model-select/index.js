import React from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';

import Button from '../../../components/button';
import Popup from '../../../components/popup';
import ModelItem from '../../../components/model-item';
import Alert from '../../../components/alert';
import { useBbox } from '../../../util/hooks.js';
import { setSelectedModel } from '../../../actions/models.js';

import { ReactComponent as Model } from '../../../images/model.svg';

import './index.css';

const selector = (state) => ({
  models: Array.isArray(state.models) ?
    state.models.map((model) => ({
      id: model.id,
      selected: model.selected,
      title: model.title,
      authors: (model.authors || '').split('\n'),
      journal: model.journal,
      year: model.year
    })) :
    state.models
});

let ModelSelect = ({ models, dispatch }) => {
  const [buttonBbox, buttonRef] = useBbox();
  const [isOpen, setIsOpen] = useState(false);

  let content = <></>;
  if (Array.isArray(models)) {
    content = models.map((model, index, array) => (
      <React.Fragment key={index}>
        <ModelItem
          onClick={() => dispatch(setSelectedModel({ id: model.id }))}
          {...model}
        />
        {index < array.length - 1 && <hr />}
      </React.Fragment>
    ));
  } else if (models === 'loading')
    content = <Alert text='Loading models' loading />;
  else if (models === 'empty')
    content = <Alert text='No models found' />;
  else if (models === 'error')
    content = <Alert text='Error getting models' error />;

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
        {content}
      </Popup>
    </>
  );
};

ModelSelect = connect(selector)(ModelSelect);

export default ModelSelect;
