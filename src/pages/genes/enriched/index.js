import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getGeneParticipations } from '../../../actions/genes';
import { usePrev } from '../../../util/hooks.js';

import './index.css';

let Enriched = ({ selected, getParticipations }) => {
  const prevSelected = usePrev(selected) || [];
  useEffect(() => {
    if (selected.length !== prevSelected.length) {
      getParticipations({
        genes: selected,
        limit: 999999,
        cancelType: 'GET_GENE_PARTICIPATIONS'
      });
    }
  }, [selected, prevSelected, getParticipations]);

  return <div>sup</div>;
};

const mapStateToProps = (state) => ({
  selected: state.gene.selected.map((selected) => selected.id)
});

const mapDispatchToProps = (dispatch) => ({
  getParticipations: (...args) => dispatch(getGeneParticipations(...args))
});

Enriched = connect(mapStateToProps, mapDispatchToProps)(Enriched);

export default Enriched;
