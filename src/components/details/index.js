import React from 'react';
import { isValidElement } from 'react';
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import Linkify from 'react-linkify';

import HorizontalLine from '../../components/horizontal-line';

import './index.css';
import { isNumber } from '../../util/types';
import { isString } from '../../util/types';
import { isArray } from '../../util/types';

// table showing all key/value pairs of an object/item

const Details = ({ data = {} }) => {
  if (typeof data !== 'object' || data === null || !Object.keys(data).length)
    return <></>;

  return (
    <>
      {Object.keys(data).map((key, index, array) => (
        <Fragment key={index}>
          <div className='detail_row'>
            <span className='nowrap medium'>{key}</span>
            <span>
              <Linkify>{format(data[key])}</Linkify>
            </span>
          </div>
          {index < array.length - 1 && <HorizontalLine />}
        </Fragment>
      ))}
    </>
  );
};

Details.propTypes = {
  data: PropTypes.any
};

export default Details;

const format = (value) => {
  if (isNumber(value) || isString(value)) {
    value = String(value);
    value = value
      .split('\n')
      .map((line, index) => <div key={index}>{line}</div>);
  } else if (isArray(value))
    value = value.length;
  else if (!isValidElement(value))
    value = '-';

  return value;
};
