import React from 'react';
import { connect } from 'react-redux';

import Table from './table';
import FetchAlert from '../../../components/fetch-alert';

import { isString } from '../../../util/types.js';
import { isArray } from '../../../util/types.js';

import './index.css';

let Enriched = ({ enrichedSignatures }) => {
  return (
    <>
      {isString(enrichedSignatures) && (
        <FetchAlert status={enrichedSignatures} subject='enriched signatures' />
      )}
      {isArray(enrichedSignatures) && (
        <Table enrichedSignatures={enrichedSignatures} />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  enrichedSignatures: state.gene.enrichedSignatures
});

Enriched = connect(mapStateToProps)(Enriched);

export default Enriched;
