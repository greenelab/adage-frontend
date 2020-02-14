import React from 'react';
import { connect } from 'react-redux';

import { selectFirstGenes } from '../../../../actions/genes';
import { deselectFirstGenes } from '../../../../actions/genes';
import Button from '../../../../components/button';

import './index.css';

// controls below multi search results

let MultiControls = ({ selectFirst, deselectFirst }) => (
  <div className='controls'>
    <Button
      text='select'
      onClick={selectFirst}
      aria-label='Select the first result for each search term'
    />
    <Button
      text='deselect'
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
