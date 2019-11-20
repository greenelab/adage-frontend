import React from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';

import Button from '../../../components/button';
import Popup from '../../../components/popup';
import ModelItem from '../../../components/model-item';
import { useBbox } from '../../../util/hooks.js';
import { getModelList } from '../../../reducers/models.js';
import { setSelectedModel } from '../../../actions/models.js';

import { ReactComponent as Model } from '../../../images/model.svg';

import './index.css';

const ModelSelect = connect(getModelList)(({ models, dispatch }) => {
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
        {Array.isArray(models) &&
          models.map((model, index, array) => (
            <React.Fragment key={index}>
              <ModelItem
                onClick={() => dispatch(setSelectedModel(index))}
                selected={model.selected}
                title={model.title}
                authors={model.authors}
                publisher={model.publisher}
                year={model.year}
              />
              {index < array.length - 1 && <hr />}
            </React.Fragment>
          ))}
      </Popup>
    </>
  );
});

export default ModelSelect;
