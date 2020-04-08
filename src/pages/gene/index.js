import React from 'react';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import Section from '../../components/section';
import Details from '../../components/details';
import FetchAlert from '../../components/fetch-alert';
import { actionStatuses } from '../../actions/fetch';
import { isArray } from '../../util/types';
import { isObject } from '../../util/types';
import { isString } from '../../util/types';
import { filterKeys } from '../../util/object';
import { humanizeKeys } from '../../util/object';

import { ReactComponent as GeneIcon } from '../../images/gene.svg';

import './index.css';

// gene details page

let Gene = ({ genes }) => {
  const match = useRouteMatch();
  const id = match.params.id;

  let details;

  if (isString(genes))
    details = genes;
  else if (isArray(genes)) {
    const found = genes.find((gene) => String(gene.id) === String(id));
    if (!found)
      details = actionStatuses.EMPTY;
    else {
      details = { ...found };
      details = filterKeys(details, ['maxSimilarityField', 'weight']);
      details = humanizeKeys(details);
    }
  }

  return (
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
          {isObject(details) && <Details data={details} />}
          {isString(details) && (
            <FetchAlert status={details} subject='gene details' />
          )}
        </Section>
      </Main>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({ genes: state.genes.list });

Gene = connect(mapStateToProps)(Gene);

export default Gene;
