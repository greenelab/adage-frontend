import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import SectionHeader from '../../components/section-header';
import Details from '../../components/details';
import Alert from '../../components/alert';
import { getModelDetails } from '../../actions/models.js';
import { isObject } from '../../util/types.js';
import { isString } from '../../util/types.js';

import './index.css';

let Model = ({ match, details, dispatch }) => {
  const id = match.params.id;

  useEffect(() => {
    dispatch(getModelDetails({ id: id }));
  }, [id, dispatch]);

  return (
    <>
      <Header justTitle />
      <Main>
        <SectionHeader text='Model Details' />
        <section>
          {isObject(details) && <Details data={details} />}
          {isString(details) && (
            <Alert status={details} subject='model details' />
          )}
        </section>
      </Main>
      <Footer />
    </>
  );
};

const selector = (state) => ({
  details: state.model.details
});

Model = withRouter(Model);
Model = connect(selector)(Model);

export default Model;
