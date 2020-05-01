import React from 'react';
import PropTypes from 'prop-types';

import Clickable from '../../../../components/clickable';

import { ReactComponent as RadioedIcon } from '../../../../images/radioed.svg';
import { ReactComponent as UnradioedIcon } from '../../../../images/unradioed.svg';

import './index.css';

// entry row in model select list

const Item = ({
  onClick = () => null,
  selected = false,
  id = null,
  title = 'Untitled model',
  authors = ['Unknown author'],
  journal = '-',
  year = '-'
}) => (
  <div className='model_item'>
    <Clickable
      icon={selected ? <RadioedIcon /> : <UnradioedIcon />}
      button
      aria-label='Select this model'
      data-tooltip-v-align='bottom'
      onClick={onClick}
    />
    <div className='model_summary'>
      <Clickable
        to={'/model/' + id}
        text={title}
        link
        aria-label={'Open details page for model ' + title}
        data-tooltip-h-align='right'
        data-tooltip-v-align='bottom'
      />
      <span className='nowrap size_tiny'>
        {authors[0]}, et al · {journal} · {year}
      </span>
    </div>
  </div>
);

Item.propTypes = {
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title: PropTypes.string,
  authors: PropTypes.arrayOf(PropTypes.string),
  journal: PropTypes.string,
  year: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default Item;
