import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Item from '../item';
import { setSelectedModel } from '../../../../actions/models.js';

let List = ({ models, dispatch }) => (
  <>
    {models.map((model, index, array) => (
      <React.Fragment key={index}>
        <Item
          onClick={() => dispatch(setSelectedModel({ id: model.id }))}
          {...model}
        />
        {index < array.length - 1 && <hr />}
      </React.Fragment>
    ))}
  </>
);

List.propTypes = {
  models: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired
};

List = connect()(List);

export default List;
