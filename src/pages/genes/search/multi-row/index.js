import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect } from 'react-redux';

import SingleTable from '../single-table';
import Tooltip from '../../../../components/tooltip';
import Link from '../../../../components/link';
import Field from '../../../../components/field';
import FetchAlert from '../../../../components/fetch-alert';
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

let MultiRow = ({ search, select, deselect }) => {
  const [expanded, setExpanded] = useState(false);

  const onClick = (result) =>
    (result.selected ? deselect : select)({ id: result.id });

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
      content.push(
        <SingleTable
          key={content.length}
          results={search.results.slice(0, expandedResultLimit)}
        />
      );
    } else {
      search.results
        .slice(0, collapsedResultLimit)
        .forEach((result, index, array) => {
          content.push(
            <ResultButton
              key={content.length}
              onClick={() => onClick(result)}
              id={result.id}
              selected={result.selected}
              standardName={result.standardName}
              systematicName={result.systematicName}
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
          <Field>"{search.query}"</Field>
        </div>
        {!expanded && (
          <>
            <VerticalLine />
            <div className='gene_search_result_multi_results'>{content}</div>
            <VerticalLine />
          </>
        )}
        <Button
          className='gene_search_result_multi_expand'
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
  select: (...args) => dispatch(selectGene(...args)),
  deselect: (...args) => dispatch(deselectGene(...args))
});

MultiRow = connect(null, mapDispatchToProps)(MultiRow);

MultiRow.propTypes = {
  search: PropTypes.object.isRequired
};

export default MultiRow;

const ResultButton = ({
  onClick = () => null,
  selected = false,
  id = -1,
  standardName = '-',
  systematicName = '-'
}) => (
  <>
    <Tooltip
      text={(selected ? 'Deselect' : 'Select') + ' this gene'}
      horizontalAlign='left'
    >
      <Button className='gene_search_result_multi_check' onClick={onClick}>
        {selected && <Checked />}
        {!selected && <Unchecked />}
      </Button>
    </Tooltip>
    <span className='td' data-padded='true'>
      <Link
        to={'/gene/' + id}
        newTab
        button={false}
        text={standardName}
      />
    </span>
    <span className='td' data-padded='true'>
      <Field>{systematicName}</Field>
    </span>
  </>
);
