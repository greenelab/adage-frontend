import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import SectionHeader from '../../components/section-header';
import Details from '../../components/details';
import FetchAlert from '../../components/fetch-alert';
import { getGeneDetails } from '../../actions/genes.js';
import { isObject } from '../../util/types.js';
import { isString } from '../../util/types.js';

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
        <SectionHeader text='Gene Details' />
        <section>
          {isObject(details) && <Details data={details} />}
          {isString(details) && (
            <FetchAlert status={details} subject='gene details' />
          )}
        </section>
      </Main>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  details: state.gene.details
});

const mapDispatchToProps = (dispatch) => ({
  getDetails: (...args) => dispatch(getGeneDetails(...args))
});

Gene = withRouter(Gene);
Gene = connect(mapStateToProps, mapDispatchToProps)(Gene);

export default Gene;
