import React from 'react';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import SampleLink from '../sample/link';
import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import Section from '../../components/section';
import Details from '../../components/details';
import FetchAlert from '../../components/fetch-alert';
import { getExperimentDetails } from '../../actions/experiments';
import { isObject } from '../../util/types';
import { isString } from '../../util/types';
import { filterKeys } from '../../util/object';
import { humanizeKeys } from '../../util/object';

import { ReactComponent as ExperimentIcon } from '../../images/experiment.svg';

import './index.css';

// experiment details page

let Experiment = ({ match, details, getDetails }) => {
  const accession = match.params.accession;

  useEffect(() => {
    getDetails({ accession: accession });
  }, [accession, getDetails]);

  return (
    <>
      <Header justTitle />
      <Main>
        <Section
          header={
            <>
              <ExperimentIcon />
              <span>Experiment Details</span>
            </>
          }
        >
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

const mapStateToProps = (state) => {
  let details = state.experiment.details;

  if (isObject(details)) {
    details = filterKeys(details, ['maxSimilarityField']);
    if (details.samples) {
      details.samples = (
        <>
          {details.samples.map((sample, index) => (
            <Fragment key={index}>
              <SampleLink sample={sample} />
              <br />
            </Fragment>
          ))}
        </>
      );
    }
    details = humanizeKeys(details);
  }

  return { details };
};

const mapDispatchToProps = (dispatch) => ({
  getDetails: (...args) => dispatch(getExperimentDetails(...args))
});

Experiment = withRouter(Experiment);
Experiment = connect(mapStateToProps, mapDispatchToProps)(Experiment);

export default Experiment;
