import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Linkify from 'react-linkify';

import { getModelDetails } from '../../reducers/models.js';

import './details.css';

let Details = ({ details = {} }) => (
  <section>
    {Object.keys(details)
      .filter(filter)
      .map((key) => (
        <div key={key} className='model_detail_row'>
          <span className='text_small semibold'>{key}</span>
          <span>
            <Linkify>{format(details[key])}</Linkify>
          </span>
        </div>
      ))}
  </section>
);

Details = connect(getModelDetails)(Details);
Details = withRouter(Details);

export default Details;

const format = (value) => {
  const type = typeof value;
  if (type === 'string' || (type === 'number' && !Number.isNaN(value))) {
    value = String(value);
    value = value
      .split('\n')
      .map((line, index) => <div key={index}>{line}</div>);
  } else
    value = '-';

  return value;
};

const filter = (key) => {
  return key !== 'selected';
};
