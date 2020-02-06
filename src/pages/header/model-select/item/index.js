import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '../../../../components/tooltip';
import Field from '../../../../components/field';
import Button from '../../../../components/button';
import Link from '../../../../components/link';

import { ReactComponent as RadioedIcon } from '../../../../images/radioed.svg';
import { ReactComponent as UnradioedIcon } from '../../../../images/unradioed.svg';
import { ReactComponent as InfoIcon } from '../../../../images/info.svg';

import './index.css';

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
    <Button className='model_button' onClick={onClick}>
      <Tooltip text={'Select this model'}>
        <div className='model_radio'>
          {selected && <RadioedIcon />}
          {!selected && <UnradioedIcon />}
        </div>
      </Tooltip>
      <div className='model_summary'>
        <Field className='medium'>{title}</Field>
        <Field className='text_small'>
          {authors[0]}, et al · {journal} · {year}
        </Field>
      </div>
    </Button>
    <Tooltip text='View full model details'>
      <Link
        to={'/model/' + id}
        newTab
        icon={<InfoIcon />}
        tooltip={'Open details page for model ' + title}
      />
    </Tooltip>
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
