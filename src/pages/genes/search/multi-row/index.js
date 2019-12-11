import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect } from 'react-redux';

import SingleRow from '../single-row';
import Alert from '../../../../components/alert';
import Button from '../../../../components/button';
import HorizontalLine from '../../../../components/horizontal-line';
import VerticalLine from '../../../../components/vertical-line';
import { selectGene } from '../../../../actions/genes.js';
import { deselectGene } from '../../../../actions/genes.js';
import { isString } from '../../../../util/types.js';
import { isArray } from '../../../../util/types.js';

import { ReactComponent as Checked } from '../../../../images/checked.svg';
import { ReactComponent as Unchecked } from '../../../../images/unchecked.svg';
import { ReactComponent as Caret } from '../../../../images/caret.svg';

import './index.css';

const collapsedResultLimit = 3;
const expandedResultLimit = 5;

let MultiRow = ({ search, selectGene, deselectGene }) => {
  const [expanded, setExpanded] = useState(false);

  const onClick = (id, selected) =>
    (selected ? deselectGene : selectGene)({ id: id });

  let content = <></>;
  if (isString(search.results)) {
    content = (
      <Alert
        className='gene_search_results_multi_alert'
        status={search.results}
        subject='gene results'
      />
    );
  } else if (isArray(search.results)) {
    if (expanded) {
      content = [];
      for (
        let index = 0;
        index < expandedResultLimit && index < search.results.length;
        index++
      ) {
        content.push(
          <SingleRow
            key={content.length}
            onClick={onClick}
            selected={search.results[index].selected}
            id={search.results[index].id}
            cols={search.results[index].cols}
            highlightedCol={search.results[index].highlightedCol}
          />
        );
        if (index < expandedResultLimit - 1)
          content.push(<HorizontalLine key={content.length} />);
      }
    } else {
      content = [];
      for (
        let index = 0;
        index < collapsedResultLimit && index < search.results.length;
        index++
      ) {
        content.push(
          <ResultButton
            key={content.length}
            onClick={onClick}
            selected={search.results[index].selected}
            id={search.results[index].id}
            col1={search.results[index].cols[0]}
            col2={search.results[index].cols[1]}
          />
        );
        if (index < collapsedResultLimit - 1)
          content.push(<VerticalLine key={content.length} />);
      }
    }
  }

  return (
    <>
      <div className='gene_search_result_multi'>
        <div
          className='gene_search_result_multi_query text_small'
          data-expanded={expanded}
        >
          <span className='field nowrap'>"{search.query}"</span>
        </div>
        {!expanded && (
          <>
            <VerticalLine />
            <div className='gene_search_result_multi_summary'>{content}</div>
            <VerticalLine />
          </>
        )}
        <Button
          className='gene_search_result_multi_caret'
          icon={<Caret className={expanded ? 'flip_vertical' : ''} />}
          onClick={() => setExpanded(!expanded)}
        />
      </div>
      {expanded && (
        <>
          <HorizontalLine />
          {content}
        </>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  selectGene: (...args) => dispatch(selectGene(...args)),
  deselectGene: (...args) => dispatch(deselectGene(...args))
});

MultiRow = connect(null, mapDispatchToProps)(MultiRow);

MultiRow.propTypes = {
  search: PropTypes.object.isRequired
};

export default MultiRow;

const ResultButton = ({
  onClick = () => null,
  id = null,
  selected = false,
  col1 = '-',
  col2 = '-'
}) => (
  <Button
    className='gene_search_result_multi_button'
    onClick={() => onClick(id, selected)}
  >
    <div className='gene_search_result_multi_check'>
      {selected && <Checked />}
      {!selected && <Unchecked />}
    </div>
    <span
      className={`
        gene_search_result_multi_details
        field
        text_small
        nowrap
      `}
    >
      {col1}
    </span>
    <span
      className={`
        gene_search_result_multi_details
        field
        text_small
        nowrap
      `}
    >
      {col2}
    </span>
  </Button>
);
