import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect } from 'react-redux';

import SingleTable from '../single-table';
import GeneLink from '../../../gene/link';
import FetchAlert from '../../../../components/fetch-alert';
import Clickable from '../../../../components/clickable';
import HorizontalLine from '../../../../components/horizontal-line';
import VerticalLine from '../../../../components/vertical-line';
import { selectGene } from '../../../../actions/genes';
import { deselectGene } from '../../../../actions/genes';
import { makeMapDispatchToProps } from '../../../../actions';
import { isString } from '../../../../util/types';
import { isArray } from '../../../../util/types';

import { ReactComponent as CheckedIcon } from '../../../../images/checked.svg';
import { ReactComponent as UncheckedIcon } from '../../../../images/unchecked.svg';
import { ReactComponent as CaretIcon } from '../../../../images/caret.svg';

import './index.css';

const collapsedResultLimit = 3;
const expandedResultLimit = 5;

// multi search result row

let MultiRow = ({ search, selectGene, deselectGene }) => {
  const [expanded, setExpanded] = useState(false);

  // select/deselect gene on click of a result button
  const onClick = (result) =>
    (result.selected ? deselectGene : selectGene)({ id: result.id });

  let content = <></>;
  if (isString(search.results)) {
    content = (
      <FetchAlert
        className='gene_search_results_multi_alert'
        status={search.results}
        subject='gene results'
      />
    );
  } else if (isArray(search.results)) {
    content = [];
    if (expanded) {
      // if expanded, show table just like single search results
      content.push(
        <SingleTable
          key={content.length}
          results={search.results.slice(0, expandedResultLimit)}
        />
      );
    } else {
      // otherwise, show compact/minified results, horizontally
      search.results
        .slice(0, collapsedResultLimit)
        .forEach((result, index, array) => {
          content.push(
            <ResultButton
              key={content.length}
              onClick={() => onClick(result)}
              gene={result}
            />
          );
          if (index < array.length - 1)
            content.push(<VerticalLine key={content.length} />);
        });
    }
  }

  return (
    <>
      <div className='gene_search_result_multi'>
        <div
          className='td gene_search_result_multi_query'
          data-expanded={expanded}
          data-padded='true'
        >
          <span className='nowrap'>"{search.query}"</span>
        </div>
        {!expanded && (
          <>
            <VerticalLine />
            <div className='gene_search_result_multi_results'>{content}</div>
            <VerticalLine />
          </>
        )}
        <Clickable
          className='gene_search_result_multi_expand'
          button
          icon={<CaretIcon className={expanded ? 'flip_vertical' : ''} />}
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

const mapDispatchToProps = makeMapDispatchToProps({ selectGene, deselectGene });

MultiRow = connect(null, mapDispatchToProps)(MultiRow);

MultiRow.propTypes = {
  search: PropTypes.object.isRequired
};

export default MultiRow;

// multi search result button

const ResultButton = ({ onClick = () => null, gene = {} }) => (
  <>
    <Clickable
      className='gene_search_result_multi_check'
      icon={gene.selected ? <CheckedIcon /> : <UncheckedIcon />}
      button
      onClick={onClick}
      aria-label={(gene.selected ? 'Deselect' : 'Select') + ' this gene'}
    />
    <span className='td' data-padded='true'>
      <GeneLink gene={gene} />
    </span>
    <span className='td nowrap' data-padded='true'>
      {gene.systematicName}
    </span>
  </>
);
