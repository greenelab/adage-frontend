import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Item from '../item';
import HorizontalLine from '../../../../components/horizontal-line';
import { setSelectedModel } from '../../../../actions/models.js';

import './index.css';

let List = ({ models, setSelected }) => (
  <>
    {models.map((model, index, array) => (
      <React.Fragment key={index}>
        <Item onClick={() => setSelected({ id: model.id })} {...model} />
        {index < array.length - 1 && <HorizontalLine />}
      </React.Fragment>
    ))}
  </>
);

List.propTypes = {
  models: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapDispatchToProps = (dispatch) => ({
  setSelected: (...args) => dispatch(setSelectedModel(...args))
});

List = connect(null, mapDispatchToProps)(List);

export default List;
