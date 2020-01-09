import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import Table from './table';
import FetchAlert from '../../../components/fetch-alert';
import { getGeneEnrichedSignatures } from '../../../actions/genes';
import { isString } from '../../../util/types.js';
import { isArray } from '../../../util/types.js';

import './index.css';

let Enriched = ({
  selectedGenesCount,
  selectedGenesLoaded,
  selectedGenes,
  geneCount,
  signatures,
  enrichedSignatures,
  getEnrichedSignatures
}) => {
  useEffect(() => {
    if (selectedGenesLoaded && geneCount && isArray(signatures)) {
      getEnrichedSignatures({
        ids: isArray(selectedGenes) ?
          selectedGenes.map((gene) => gene.id) :
          null,
        limit: selectedGenes.length ? 999999 : 1,
        cancelType: 'GET_GENE_ENRICHED_SIGNATURES',
        selectedGenes,
        geneCount,
        signatures
      });
    }
  }, [
    selectedGenesCount,
    selectedGenesLoaded,
    selectedGenes,
    geneCount,
    signatures,
    getEnrichedSignatures
  ]);

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
  selectedGenesCount: state.gene.selected.length,
  selectedGenesLoaded: state.gene.selected.every(
    (selected) => selected.standard_name
  ),
  selectedGenes: state.gene.selected,
  geneCount: state.gene.count,
  signatures: state.signature.list,
  enrichedSignatures: state.gene.enrichedSignatures
});

const mapDispatchToProps = (dispatch) => ({
  getEnrichedSignatures: (...args) =>
    dispatch(getGeneEnrichedSignatures(...args))
});

Enriched = connect(mapStateToProps, mapDispatchToProps)(Enriched);

export default Enriched;
