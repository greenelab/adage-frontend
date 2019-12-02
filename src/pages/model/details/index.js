import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Linkify from 'react-linkify';

import './index.css';

export const selector = (state, ownProps) => {
  if (Array.isArray(state.models)) {
    return {
      details: state.models.find(
        (model) => String(model.id) === String(ownProps.match.params.id)
      )
    };
  } else
    return {};
};

let Details = ({ details = {} }) => (
  <>
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
  </>
);

Details = connect(selector)(Details);
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
