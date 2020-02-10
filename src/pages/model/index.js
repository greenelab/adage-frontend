import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import Section from '../../components/section';
import Details from '../../components/details';
import FetchAlert from '../../components/fetch-alert';
import { getModelDetails } from '../../actions/models';
import { isObject } from '../../util/types';
import { isString } from '../../util/types';
import { normalize } from '../../util/object';

import { ReactComponent as ModelIcon } from '../../images/model.svg';

import './index.css';

// model details page

let Model = ({ match, details, getDetails }) => {
  const id = match.params.id;

  useEffect(() => {
    getDetails({ id: id });
  }, [id, getDetails]);

  return (
    <>
      <Header justTitle />
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

const mapStateToProps = (state) => {
  let details = state.model.details;

  if (isObject(details)) {
    details = normalize(details, true, null, [
      'Id',
      'Directed G2g Edge',
      'G2g Edge Cutoff',
      'Organism'
    ]);
  }

  return { details };
};

const mapDispatchToProps = (dispatch) => ({
  getDetails: (...args) => dispatch(getModelDetails(...args))
});

Model = withRouter(Model);
Model = connect(mapStateToProps, mapDispatchToProps)(Model);

export default Model;
