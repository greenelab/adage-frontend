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

import { ReactComponent as ModelIcon } from '../../images/model.svg';

import './index.css';

// model details page

let Model = ({ models }) => {
  const match = useRouteMatch();
  const id = match.params.id;

  let details;

  if (isString(models))
    details = models;
  else if (isArray(models)) {
    const found = models.find((model) => String(model.id) === String(id));
    if (!found)
      details = actionStatuses.EMPTY;
    else {
      details = { ...found };
      details = filterKeys(details, [
        'directedG2GEdge',
        'g2GEdgeCutoff',
        'organism'
      ]);
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
              <ModelIcon />
              <span>Model Details</span>
            </>
          }
        >
          {isObject(details) && <Details data={details} />}
          {isString(details) && (
            <FetchAlert status={details} subject='model details' />
          )}
        </Section>
      </Main>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({ models: state.models.list });

Model = connect(mapStateToProps)(Model);

export default Model;
