import React from 'react';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router';

import ExperimentLink from '../experiment/link';
import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import Section from '../../components/section';
import Details from '../../components/details';
import FetchAlert from '../../components/fetch-alert';
import { getSampleDetails } from '../../actions/samples';
import { isObject } from '../../util/types';
import { isString } from '../../util/types';
import { filterKeys } from '../../util/object';
import { humanizeKeys } from '../../util/object';

import { ReactComponent as SampleIcon } from '../../images/sample.svg';

import './index.css';

// sample details page

let Sample = ({ details, getDetails }) => {
  const match = useRouteMatch();
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
              <SampleIcon />
              <span>Sample Details</span>
            </>
          }
        >
          {isObject(details) && <Details data={details} />}
          {isString(details) && (
            <FetchAlert status={details} subject='sample details' />
          )}
        </Section>
      </Main>
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
  let details = state.samples.details;

  if (isObject(details)) {
    details = filterKeys(details, ['id']);
    if (details.experiments) {
      details.experiments = (
        <>
          {details.experiments.map((experiment, index) => (
            <Fragment key={index}>
              {console.log(experiment)}
              <ExperimentLink experiment={experiment} />
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
  getDetails: (...args) => dispatch(getSampleDetails(...args))
});

Sample = connect(mapStateToProps, mapDispatchToProps)(Sample);

export default Sample;
