import React from 'react';
import { connect } from 'react-redux';

import ExperimentLink from '../../../experiment/link';
import Clickable from '../../../../components/clickable';
import TableComponent from '../../../../components/table';
import { selectExperiment } from '../../../../actions/experiments';

import { ReactComponent as RadioedIcon } from '../../../../images/radioed.svg';
import { ReactComponent as UnradioedIcon } from '../../../../images/unradioed.svg';

import './index.css';

// single search result table

let Table = ({ query, results, highlightedIndex, select }) => {
  if (query.trim() === '')
    results = results.slice(0, 10);

  return (
    <>
      {query.trim() === '' && (
        <div className='search_results_note'>
          <span aria-label='Search to find specific result'>
            or try one of these:
          </span>
        </div>
      )}
      <TableComponent
        data={results}
        columns={[
          {
            render: ({ row }) => (
              <Clickable
                icon={row.selected ? <RadioedIcon /> : <UnradioedIcon />}
                button
                onClick={() => select({ id: row.id })}
                aria-label='Select this experiment'
              />
            ),
            width: '30px',
            padded: false
          },
          {
            name: 'Accession',
            key: 'accession',
            render: ({ row }) => <ExperimentLink experiment={row} />,
            width: 'calc((100% - 30px) * 0.07)'
          },
          {
            name: 'Samples',
            key: 'samples',
            value: ({ cell }) => cell?.length,
            render: ({ cell }) => cell?.length,
            width: 'calc((100% - 30px) * 0.03)',
            align: 'center'
          },
          {
            name: 'Name',
            key: 'name',
            width: 'calc((100% - 30px) * 0.2)'
          },
          {
            name: 'Description',
            key: 'description',
            width: 'calc((100% - 30px) * 0.7)'
          }
        ]}
        minWidth='2000px'
        highlightedIndex={highlightedIndex}
        sortable={false}
      />
      {query.trim() !== '' && (
        <div className='search_results_note'>
          <span aria-label='Search to find specific result'>
            Top {results.length} results
          </span>
        </div>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  select: (...args) => dispatch(selectExperiment(...args))
});

Table = connect(null, mapDispatchToProps)(Table);

export default Table;
