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
import { flatten } from '../../util/object';
import { humanizeKeys } from '../../util/object';

import { ReactComponent as OrganismIcon } from '../../images/organism.svg';

import './index.css';

// organism details page

let Organism = ({ organisms }) => {
  const match = useRouteMatch();
  const id = match.params.id;

  let details;

  if (isString(organisms))
    details = organisms;
  else if (isArray(organisms)) {
    const found = organisms.find(
      (organism) => String(organism.id) === String(id)
    );
    if (!found)
      details = actionStatuses.EMPTY;
    else {
      details = { ...found };
      details = flatten(details, 1);
      details = humanizeKeys(details);
    }
  }

  return (
    <>
      <Header />
      <Main>
        <Section
          header={
            <>
              <OrganismIcon />
              <span>Organism Details</span>
            </>
          }
        >
          {isObject(details) && <Details data={details} />}
          {isString(details) && (
            <FetchAlert status={details} subject='organism details' />
          )}
        </Section>
      </Main>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({ organisms: state.organisms.list });

Organism = connect(mapStateToProps)(Organism);

export default Organism;
