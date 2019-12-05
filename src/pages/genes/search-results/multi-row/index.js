import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';

import SingleRow from '../single-row';
import Alert from '../../../../components/alert';
import Button from '../../../../components/button';
import ButtonIcon from '../../../../components/button-icon';
import Vr from '../../../../components/vr';
import { selectGene } from '../../../../actions/genes.js';
import { deselectGene } from '../../../../actions/genes.js';
import { isString } from '../../../../util/types.js';
import { isArray } from '../../../../util/types.js';

import { ReactComponent as Checked } from '../../../../images/checked.svg';
import { ReactComponent as Unchecked } from '../../../../images/unchecked.svg';
import { ReactComponent as Caret } from '../../../../images/caret.svg';

import './index.css';

let MultiRow = ({ search, dispatch }) => {
  const [expanded, setExpanded] = useState(false);

  const onClick = (id, selected) =>
    dispatch((selected ? deselectGene : selectGene)({ id: id }));

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
    const result1 = search.results[0];
    const result2 = search.results[1];
    const result3 = search.results[2];

    if (expanded) {
      content = (
        <>
          {result1 && (
            <SingleRow
              onClick={onClick}
              selected={result1.selected}
              id={result1.id}
              col1={result1.standardName}
              col2={result1.systematicName}
              col3={result1.entrezId}
              col4={result1.description}
            />
          )}
          {result2 && (
            <>
              <hr />
              <SingleRow
                onClick={onClick}
                selected={result2.selected}
                id={result2.id}
                col1={result2.standardName}
                col2={result2.systematicName}
                col3={result2.entrezId}
                col4={result2.description}
              />
            </>
          )}
          {result3 && (
            <>
              <hr />
              <SingleRow
                onClick={onClick}
                selected={result3.selected}
                id={result3.id}
                col1={result3.standardName}
                col2={result3.systematicName}
                col3={result3.entrezId}
                col4={result3.description}
              />
            </>
          )}
        </>
      );
    } else {
      content = (
        <>
          {result1 && (
            <>
              <ResultButton
                onClick={onClick}
                selected={result1.selected}
                id={result1.id}
                col1={result1.standardName}
                col2={result1.systematicName}
              />
              <Vr />
            </>
          )}
          {result2 && (
            <>
              <ResultButton
                onClick={onClick}
                selected={result2.selected}
                id={result2.id}
                col1={result2.standardName}
                col2={result2.systematicName}
              />
              <Vr />
            </>
          )}
          {result3 && (
            <ResultButton
              onClick={onClick}
              selected={result3.selected}
              id={result3.id}
              col1={result3.standardName}
              col2={result3.systematicName}
            />
          )}
        </>
      );
    }
  }

  return (
    <>
      <div className='gene_search_result_multi'>
        <div
          className='gene_search_result_multi_string text_small'
          data-expanded={expanded}
        >
          <span className='gene_search_result_field'>{search.string}</span>
        </div>
        {!expanded && (
          <>
            <Vr />
            <div className='gene_search_result_multi_summary'>{content}</div>
            <Vr />
          </>
        )}
        <ButtonIcon
          className='gene_search_result_multi_caret'
          icon={<Caret className={expanded ? 'flip_vertically' : ''} />}
          onClick={() => setExpanded(!expanded)}
        />
      </div>
      {expanded && (
        <>
          <hr />
          {content}
        </>
      )}
    </>
  );
};

MultiRow = connect()(MultiRow);

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
    <span className='gene_search_result_multi_details gene_search_result_field text_small'>
      {col1}
    </span>
    <span className='gene_search_result_multi_details gene_search_result_field text_small'>
      {col2}
    </span>
  </Button>
);
