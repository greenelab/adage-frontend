import React from 'react';
import { connect } from 'react-redux';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import Section from '../../components/section';
import Details from '../../components/details';
import FetchAlert from '../../components/fetch-alert';
import { geneIsLoaded } from '../../reducers/genes';
import { actionStatuses } from '../../actions/fetch';
import { isObject } from '../../util/types';
import { isString } from '../../util/types';
import { filterKeys } from '../../util/object';
import { humanizeKeys } from '../../util/object';

import { ReactComponent as GeneIcon } from '../../images/gene.svg';

import './index.css';

// gene details page

let Gene = ({ selectedGene }) => (
  <>
    <Header justTitle />
    <Main>
      <Section
        header={
          <>
            <GeneIcon />
            <span>Gene Details</span>
          </>
        }
      >
        {isObject(selectedGene) && <Details data={selectedGene} />}
        {isString(selectedGene) && (
          <FetchAlert status={selectedGene} subject='gene details' />
        )}
      </Section>
    </Main>
    <Footer />
  </>
);

const mapStateToProps = (state) => {
  let selectedGene = state.genes.selected[0];

  if (!selectedGene)
    selectedGene = actionStatuses.EMPTY;
  else if (!geneIsLoaded(selectedGene))
    selectedGene = state.genes.list;
  else if (isObject(selectedGene)) {
    selectedGene = filterKeys(selectedGene, ['maxSimilarityField', 'weight']);
    selectedGene = humanizeKeys(selectedGene);
  }

  return { selectedGene };
};

Gene = connect(mapStateToProps)(Gene);

export default Gene;
