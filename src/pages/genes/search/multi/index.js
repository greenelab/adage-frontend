import React from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';

import HorizontalLine from '../../../../components/horizontal-line';
import MultiRow from '../multi-row';
import MultiControls from '../multi-controls';
import { mapGeneSearchPayload } from '../';

import './index.css';

// component to show below search box when doing a multi search

let Multi = ({ searches }) => (
  <>
    {searches.map((search, index, array) => (
      <Fragment key={index}>
        <MultiRow search={search} />
        {index < array.length - 1 && <HorizontalLine />}
      </Fragment>
    ))}
    <MultiControls />
  </>
);

const mapStateToProps = (state) => ({
  searches: mapGeneSearchPayload(state.gene.searches, state)
});

Multi = connect(mapStateToProps)(Multi);

export default Multi;
