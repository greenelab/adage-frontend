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
import { getModelDetails } from '../../actions/models.js';
import { isObject } from '../../util/types.js';
import { isString } from '../../util/types.js';

import './index.css';

let Model = ({ match, details, getModelDetails }) => {
  const id = match.params.id;

  useEffect(() => {
    getModelDetails({ id: id });
  }, [id, getModelDetails]);

  return (
    <>
      <Header justTitle />
      <Main>
        <SectionHeader text='Model Details' />
        <section>
          {isObject(details) && <Details data={details} />}
          {isString(details) && (
            <FetchAlert status={details} subject='model details' />
          )}
        </section>
      </Main>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  details: state.model.details
});

const mapDispatchToProps = (dispatch) => ({
  getModelDetails: (...args) => dispatch(getModelDetails(...args))
});

Model = withRouter(Model);
Model = connect(mapStateToProps, mapDispatchToProps)(Model);

export default Model;
