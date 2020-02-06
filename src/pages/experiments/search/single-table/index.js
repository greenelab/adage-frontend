import React from 'react';
import { connect } from 'react-redux';

import Tooltip from '../../../../components/tooltip';
import Link from '../../../../components/link';
import Button from '../../../../components/button';
import TableComponent from '../../../../components/table';
import { selectExperiment } from '../../../../actions/experiments';

import { ReactComponent as RadioedIcon } from '../../../../images/radioed.svg';
import { ReactComponent as UnradioedIcon } from '../../../../images/unradioed.svg';

import './index.css';

// single search result table

let Table = ({ results, highlightedIndex, select }) => {
  return (
    <TableComponent
      data={results}
      columns={[
        {
          name: ' ',
          width: '30px',
          padded: false,
          render: (cell) => (
            <Tooltip text={'Select this experiment'}>
              <Button
                icon={cell.selected ? <RadioedIcon /> : <UnradioedIcon />}
                onClick={() => select({ accession: cell.accession })}
              />
            </Tooltip>
          )
        },
        {
          name: 'Accession',
          value: 'accession',
          width: 'calc((100% - 30px) * 0.25)',
          render: (cell) => (
            <Link
              to={'/experiment/' + cell.accession}
              newTab
              button={false}
              text={cell.accession}
              tooltip={'Open details page for experiment ' + cell.accession}
            />
          )
        },
        {
          name: 'Samples',
          value: (row) => row?.samples?.length,
          width: 'calc((100% - 30px) * 0.15)',
          align: 'center'
        },
        {
          name: 'Name',
          value: 'name',
          width: 'calc((100% - 30px) * 0.6)'
        }
      ]}
      highlightedIndex={highlightedIndex}
      sortable={false}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  select: (...args) => dispatch(selectExperiment(...args))
});

Table = connect(null, mapDispatchToProps)(Table);

export default Table;
