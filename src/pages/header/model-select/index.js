import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';

import Tooltip from '../../../components/tooltip';
import Button from '../../../components/button';
import Popup from '../../../components/popup';
import FetchAlert from '../../../components/fetch-alert';
import List from './list';
import { useBbox } from '../../../util/hooks';
import { isArray } from '../../../util/types';
import { isString } from '../../../util/types';

import { ReactComponent as ModelIcon } from '../../../images/model.svg';

import './index.css';

let ModelSelect = ({ models }) => {
  const [buttonBbox, buttonRef] = useBbox();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Tooltip text='Switch between machine learning models'>
        <Button
          ref={buttonRef}
          className='model_select_button'
          onClick={() => setIsOpen(!isOpen)}
        >
          <ModelIcon />
        </Button>
      </Tooltip>
      <Popup
        isOpen={isOpen}
        anchorBbox={buttonBbox}
        className='model_select_popup'
        close={() => setIsOpen(false)}
      >
        {isArray(models) && <List models={models} />}
        {isString(models) && (
          <FetchAlert
            className='model_alert'
            status={models}
            subject='models'
          />
        )}
      </Popup>
    </>
  );
};

const mapStateToProps = (state) => ({
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

ModelSelect = connect(mapStateToProps)(ModelSelect);

export default ModelSelect;
