import React from 'react';
import { connect } from 'react-redux';

import HorizontalLine from '../../../../components/horizontal-line';
import MultiRow from '../multi-row';
import MultiControls from '../multi-controls';
import { isArray } from '../../../../util/types.js';

import './index.css';

let Multi = ({ searches }) => (
  <>
    {searches.map((search, index, array) => (
      <React.Fragment key={index}>
        <MultiRow search={search} />
        {index < array.length - 1 && <HorizontalLine />}
      </React.Fragment>
    ))}
    <MultiControls />
  </>
);

const mapStateToProps = (state) => ({
  searches: state.gene.searches.map((search) => ({
    query: search.query,
    results: isArray(search.results) ?
      search.results.map((result) => ({
        id: result.id,
        selected: state.gene.selected.includes(result.id),
        standardName: result.standard_name,
        systematicName: result.systematic_name,
        entrezId: result.entrezid,
        description: result.description
      })) :
      search.results
  }))
});

Multi = connect(mapStateToProps)(Multi);

export default Multi;
