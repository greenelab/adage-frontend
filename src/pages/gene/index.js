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

let Gene = ({ gene }) => (
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
        {isObject(gene) && <Details data={gene} />}
        {isString(gene) && <FetchAlert status={gene} subject='gene details' />}
      </Section>
    </Main>
    <Footer />
  </>
);

const mapStateToProps = (state) => {
  let gene = state.genes.selected[0];

  if (!gene)
    gene = actionStatuses.EMPTY;
  else if (!geneIsLoaded(gene))
    gene = state.genes.list;
  else if (isObject(gene)) {
    gene = filterKeys(gene, ['maxSimilarityField', 'weight']);
    gene = humanizeKeys(gene);
  }

  return { gene };
};

Gene = connect(mapStateToProps)(Gene);

export default Gene;
