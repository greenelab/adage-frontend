import React from 'react';

import Button from '../../components/button';
import LinkIcon from '../../components/link-icon';

import { ReactComponent as Radioed } from '../../images/radioed.svg';
import { ReactComponent as Unchecked } from '../../images/unchecked.svg';
import { ReactComponent as Info } from '../../images/info.svg';

import './index.css';

const ModelItem = ({
  id = null,
  onClick = () => null,
  selected = false,
  title = 'Untitled model',
  authors = ['Unknown author'],
  journal = '-',
  year = '-'
}) => (
  <div className='model_item'>
    <Button className='model_button' onClick={onClick}>
      <div className='model_radio'>
        {selected && <Radioed />}
        {!selected && <Unchecked />}
      </div>
      <div className='model_summary'>
        <div className='semibold'>{title}</div>
        <div className='text_small'>
          {authors[0]}, et al · {journal} · {year}
        </div>
      </div>
    </Button>
    <LinkIcon to={'/model/' + id} icon={<Info />} className='model_info' />
  </div>
);

export default ModelItem;
