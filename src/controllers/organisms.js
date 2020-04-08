import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getOrganismList } from '../actions/organisms';
import { selectOrganism } from '../actions/organisms';
import { makeMapDispatchToProps } from './util';

let OrganismController = ({
  organismList,
  selectedModel,
  getOrganismList,
  selectOrganism
}) => {
  // on first render
  // get full organism list
  useEffect(() => {
    getOrganismList();
  }, [getOrganismList]);

  // when selected model changes
  // select corresponding organism
  useEffect(() => {
    selectOrganism({ id: selectedModel.organism });
  }, [selectedModel.organism, selectOrganism]);

  return <></>;
};

const mapStateToProps = (state) => ({
  organismList: state.organisms.list,
  selectedModel: state.models.selected
});

const mapDispatchToProps = makeMapDispatchToProps({
  getOrganismList,
  selectOrganism
});

OrganismController = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganismController);

export { OrganismController };
