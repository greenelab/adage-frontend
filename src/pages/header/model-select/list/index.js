import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Item from '../item';
import HorizontalLine from '../../../../components/horizontal-line';
import { setSelectedModel } from '../../../../actions/models.js';

import './index.css';

let List = ({ models, setSelectedModel }) => (
  <>
    {models.map((model, index, array) => (
      <React.Fragment key={index}>
        <Item onClick={() => setSelectedModel({ id: model.id })} {...model} />
        {index < array.length - 1 && <HorizontalLine />}
      </React.Fragment>
    ))}
  </>
);

List.propTypes = {
  models: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapDispatchToProps = (dispatch) => ({
  setSelectedModel: (...args) => dispatch(setSelectedModel(...args))
});

List = connect(null, mapDispatchToProps)(List);

export default List;
