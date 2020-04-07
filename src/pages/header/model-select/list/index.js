import React from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';

import Item from '../item';
import HorizontalLine from '../../../../components/horizontal-line';
import { selectModel } from '../../../../actions/models';
import { makeMapDispatchToProps } from '../../../../actions';
import { isArray } from '../../../../util/types';

import './index.css';

// model select list

let List = ({ modelList, selectModel }) => (
  <>
    {modelList.map((model, index, array) => (
      <Fragment key={index}>
        <Item onClick={() => selectModel({ id: model.id })} {...model} />
        {index < array.length - 1 && <HorizontalLine />}
      </Fragment>
    ))}
  </>
);

const mapStateToProps = (state) => ({
  modelList: isArray(state.models.list) ?
    state.models.list.map((model) => ({
      selected: state.models.selected.id === model.id,
      id: model.id,
      title: model.title,
      authors: (model.authors || '').split('\n'),
      journal: model.journal,
      year: model.year
    })) :
    state.models.list
});

const mapDispatchToProps = makeMapDispatchToProps({ selectModel });

List = connect(mapStateToProps, mapDispatchToProps)(List);

export default List;
