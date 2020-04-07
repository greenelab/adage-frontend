import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';

import Clickable from '../../../components/clickable';
import Popup from '../../../components/popup';
import FetchAlert from '../../../components/fetch-alert';
import List from './list';
import { useBbox } from '../../../util/hooks';
import { isArray } from '../../../util/types';
import { isString } from '../../../util/types';

import { ReactComponent as ModelIcon } from '../../../images/model.svg';

import './index.css';

// model select button and dropdown/popup

let ModelSelect = ({ modelList }) => {
  const [buttonBbox, buttonRef] = useBbox();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Clickable
        ref={buttonRef}
        className='model_select_button'
        icon={<ModelIcon />}
        button
        onClick={() => setIsOpen(!isOpen)}
        aria-label='Switch between machine learning models'
        data-tooltip-h-align='right'
        data-tooltip-v-align='bottom'
      />
      <Popup
        isOpen={isOpen}
        anchorBbox={buttonBbox}
        className='model_select_popup'
        close={() => setIsOpen(false)}
      >
        {isArray(modelList) && <List models={modelList} />}
        {isString(modelList) && (
          <FetchAlert
            className='model_alert'
            status={modelList}
            subject='models'
          />
        )}
      </Popup>
    </>
  );
};

const mapStateToProps = (state) => ({
  modelList: state.models.list
});

ModelSelect = connect(mapStateToProps)(ModelSelect);

export default ModelSelect;
