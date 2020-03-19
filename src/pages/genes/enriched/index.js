import React from 'react';
import { connect } from 'react-redux';

import Table from './table';
import Controls from './controls';
import FetchAlert from '../../../components/fetch-alert';

import { isString } from '../../../util/types';
import { isArray } from '../../../util/types';

import './index.css';

// genes enriched signatures section

let Enriched = ({ enrichedSignatures }) => {
  return (
    <>
      {isString(enrichedSignatures) && (
        <FetchAlert status={enrichedSignatures} subject='enriched signatures' />
      )}
      {isArray(enrichedSignatures) && (
        <>
          <Table />
          <Controls />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  enrichedSignatures: state.genes.enrichedSignatures
});

Enriched = connect(mapStateToProps)(Enriched);

export default Enriched;
