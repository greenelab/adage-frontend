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
import { getGeneDetails } from '../../actions/genes.js';
import { isObject } from '../../util/types.js';
import { isString } from '../../util/types.js';
import { clean } from '../../util/object';

import './index.css';

let Gene = ({ match, details, getDetails }) => {
  const id = match.params.id;

  useEffect(() => {
    getDetails({ id: id });
  }, [id, getDetails]);

  return (
    <>
      <Header justTitle />
      <Main>
        <Section text='Gene Details'>
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

const mapStateToProps = (state) => {
  let details = state.gene.details;

  if (isObject(details))
    details = clean(details, true);

  return { details };
};

const mapDispatchToProps = (dispatch) => ({
  getDetails: (...args) => dispatch(getGeneDetails(...args))
});

Gene = withRouter(Gene);
Gene = connect(mapStateToProps, mapDispatchToProps)(Gene);

export default Gene;
