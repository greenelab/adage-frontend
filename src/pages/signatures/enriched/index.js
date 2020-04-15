import React from 'react';
import { connect } from 'react-redux';

import FetchAlert from '../../../components/fetch-alert';
import Table from './table';
import Controls from './controls';
import { isString } from '../../../util/types';
import { isArray } from '../../../util/types';

import './index.css';

// signature enriched gene sets section

let Enriched = ({ enrichedGenes }) => (
  <>
    {isString(enrichedGenes) && (
      <FetchAlert status={enrichedGenes} subject='enriched genes' />
    )}
    {isArray(enrichedGenes) && (
      <>
        <Table />
        <Controls />
      </>
    )}
  </>
);

const mapStateToProps = (state) => ({
  enrichedGenes: state.signatures.enrichedGenes
});

Enriched = connect(mapStateToProps)(Enriched);

export default Enriched;
