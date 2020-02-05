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
import { getModelDetails } from '../../actions/models.js';
import { isObject } from '../../util/types.js';
import { isString } from '../../util/types.js';
import { humanizeObject } from '../../util/object';
import { flattenObject } from '../../util/object';

import './index.css';

let Model = ({ match, details, getDetails }) => {
  const id = match.params.id;

  useEffect(() => {
    getDetails({ id: id });
  }, [id, getDetails]);

  return (
    <>
      <Header justTitle />
      <Main>
        <Section text='Model Details'>
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

  if (isObject(details))
    details = humanizeObject(flattenObject(details));

  return { details };
};

const mapDispatchToProps = (dispatch) => ({
  getDetails: (...args) => dispatch(getModelDetails(...args))
});

Model = withRouter(Model);
Model = connect(mapStateToProps, mapDispatchToProps)(Model);

export default Model;
