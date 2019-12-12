import React from 'react';
import { connect } from 'react-redux';

import HorizontalLine from '../../../../components/horizontal-line';
import MultiRow from '../multi-row';
import MultiControls from '../multi-controls';
import { isArray } from '../../../../util/types.js';

import './index.css';

let Multi = ({ searches }) => (
  <>
    <div className="search_results">
      {searches.map((search, index, array) => (
        <React.Fragment key={index}>
          <MultiRow search={search} />
          {index < array.length - 1 && <HorizontalLine />}
        </React.Fragment>
      ))}
    </div>
    <MultiControls />
  </>
);

const mapStateToProps = (state) => ({
  searches: state.gene.searches.map((search) => ({
    query: search.query,
    results: isArray(search.results) ?
      search.results.map((result) => {
        const keys = [
          'standard_name',
          'systematic_name',
          'entrezid',
          'description'
        ];
        const highlightedKey = result.max_similarity_field;
        return {
          id: result.id,
          selected: state.gene.selected.includes(result.id),
          cols: keys.map((key) => result[key]),
          highlightedCol: keys.findIndex((key) => key === highlightedKey)
        };
      }) :
      search.results
  }))
});

Multi = connect(mapStateToProps)(Multi);

export default Multi;
