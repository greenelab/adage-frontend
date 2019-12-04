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
import { getGeneDetails } from '../../actions/genes.js';

import './index.css';

let Gene = ({ match, details, dispatch }) => {
  const id = match.params.id;

  useEffect(() => {
    dispatch(getGeneDetails({ id: id }));
  }, [id, dispatch]);

  let content = <></>;
  if (typeof details === 'object')
    content = <Details data={details} />;
  else if (details === 'loading')
    content = <Alert text='Loading gene details' loading />;
  else if (details === 'empty')
    content = <Alert text='No gene details found' />;
  else if (details === 'error')
    content = <Alert text='Error getting gene details' error />;

  return (
    <>
      <Header justTitle />
      <Main>
        <SectionHeader text='Gene Details' />
        <section>{content}</section>
      </Main>
      <Footer />
    </>
  );
};

const selector = (state) => ({
  details: state.gene.details
});

Gene = withRouter(Gene);
Gene = connect(selector)(Gene);

export default Gene;
