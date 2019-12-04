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

import './index.css';

let Model = ({ match, details, dispatch }) => {
  const id = match.params.id;

  useEffect(() => {
    dispatch(getModelDetails({ id: id }));
  }, [id, dispatch]);

  let content = <></>;
  if (typeof details === 'object')
    content = <Details data={details} />;
  else if (details === 'loading')
    content = <Alert text='Loading model details' loading />;
  else if (details === 'empty')
    content = <Alert text='No model details found' />;
  else if (details === 'error')
    content = <Alert text='Error getting model details' error />;

  return (
    <>
      <Header justTitle />
      <Main>
        <SectionHeader text='Model Details' />
        <section>{content}</section>
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
