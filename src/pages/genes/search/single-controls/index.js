import React from 'react';

import Button from '../../../../components/button';

import { ReactComponent as Caret } from '../../../../images/caret.svg';

import './index.css';

const SingleControls = ({ expanded, setExpanded }) => (
  <div className='gene_search_results_single_controls'>
    <Button
      text={expanded ? 'show less' : 'show more'}
      icon={<Caret className={expanded ? 'flip_vertical' : ''} />}
      onClick={() => setExpanded(!expanded)}
    />
  </div>
);
export default SingleControls;
