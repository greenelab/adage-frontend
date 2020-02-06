import React from 'react';
import { connect } from 'react-redux';

import Link from '../../../../components/link';
import TableComponent from '../../../../components/table';

import { clean } from '../../../../util/object.js';

import './index.css';

let Table = ({ samples, deselect }) => (
  <TableComponent
    data={samples}
    columns={[
      {
        name: 'Group',
        value: 'group',
        width: '60px',
        padded: false,
        render: (cell) => ''
      },
      {
        name: 'Name',
        width: 'calc((100% - 60px) * 0.25)',
        render: (cell) => (
          <Link
            to={'/sample/' + cell.id}
            newTab
            button={false}
            text={cell.name}
          />
        )
      },
      {
        name: 'Genotype',
        value: 'genotype',
        width: 'calc((100% - 60px) * 0.25)'
      },
      {
        name: 'Strain',
        value: 'strain',
        width: 'calc((100% - 60px) * 0.10)'
      },
      {
        name: 'Description',
        value: 'description',
        width: 'calc((100% - 60px) * 0.40)'
      }
    ]}
  />
);

const mapStateToProps = (state) => ({
  samples: (state.experiment.selected.samples || []).map((sample) =>
    clean(sample)
  )
});

const mapDispatchToProps = (dispatch) => ({});

Table = connect(mapStateToProps, mapDispatchToProps)(Table);

export default Table;
