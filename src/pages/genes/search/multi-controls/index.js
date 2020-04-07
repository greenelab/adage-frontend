import React from 'react';
import { connect } from 'react-redux';

import { selectFirstGenes } from '../../../../actions/genes';
import { deselectFirstGenes } from '../../../../actions/genes';
import { makeMapDispatchToProps } from '../../../../actions';
import Clickable from '../../../../components/clickable';

import './index.css';

// controls below multi search results

let MultiControls = ({ selectFirstGenes, deselectFirstGenes }) => (
  <div className='controls'>
    <Clickable
      text='select'
      button
      onClick={selectFirstGenes}
      aria-label='Select the first result for each search term'
    />
    <Clickable
      text='deselect'
      button
      onClick={deselectFirstGenes}
      aria-label='Deselect the first result for each search term'
    />
    <span>first results</span>
  </div>
);

const mapDispatchToProps = makeMapDispatchToProps({
  selectFirstGenes,
  deselectFirstGenes
});

MultiControls = connect(null, mapDispatchToProps)(MultiControls);

export default MultiControls;
