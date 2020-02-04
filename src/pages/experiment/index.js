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
import { getExperimentDetails } from '../../actions/experiments.js';
import { isObject } from '../../util/types.js';
import { isString } from '../../util/types.js';
import { flatten } from '../../util/object.js';

import './index.css';

let Experiment = ({ match, details, getDetails }) => {
  const accession = match.params.accession;

  useEffect(() => {
    getDetails({ accession: accession });
  }, [accession, getDetails]);

  return (
    <>
      <Header justTitle />
      <Main>
        <Section text='Experiment Details'>
          {isObject(details) && <Details data={details} />}
          {isString(details) && (
            <FetchAlert status={details} subject='experiment details' />
          )}
        </Section>
      </Main>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  details: flatten(state.experiment.details)
});

const mapDispatchToProps = (dispatch) => ({
  getDetails: (...args) => dispatch(getExperimentDetails(...args))
});

Experiment = withRouter(Experiment);
Experiment = connect(mapStateToProps, mapDispatchToProps)(Experiment);

export default Experiment;
