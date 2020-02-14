import React from 'react';
import { connect } from 'react-redux';

import { selectFirstGenes } from '../../../../actions/genes';
import { deselectFirstGenes } from '../../../../actions/genes';
import Clickable from '../../../../components/clickable';

import './index.css';

// controls below multi search results

let MultiControls = ({ selectFirst, deselectFirst }) => (
  <div className='controls'>
    <Clickable
      text='select'
      button
      onClick={selectFirst}
      aria-label='Select the first result for each search term'
    />
    <Clickable
      text='deselect'
      button
      onClick={deselectFirst}
      aria-label='Deselect the first result for each search term'
    />
    <span>first results</span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  selectFirst: () => dispatch(selectFirstGenes()),
  deselectFirst: () => dispatch(deselectFirstGenes())
});

MultiControls = connect(null, mapDispatchToProps)(MultiControls);

export default MultiControls;
