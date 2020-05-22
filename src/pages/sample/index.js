import React from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router';

import ExperimentLink from '../experiment/link';
import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import Section from '../../components/section';
import Details from '../../components/details';
import FetchAlert from '../../components/fetch-alert';
import { actionStatuses } from '../../actions/fetch';
import { isArray } from '../../util/types';
import { isObject } from '../../util/types';
import { isString } from '../../util/types';
import { humanizeKeys } from '../../util/object';

import { ReactComponent as SampleIcon } from '../../images/sample.svg';

import './index.css';

// sample details page

let Sample = ({ sampleList, experimentList }) => {
  const match = useRouteMatch();
  const id = match.params.id;

  let details;

  if (isString(sampleList))
    details = sampleList;
  else if (isString(experimentList))
    details = experimentList;
  else if (isArray(sampleList) && isArray(experimentList)) {
    const found = sampleList.find((sample) => String(sample.id) === String(id));
    if (!found)
      details = actionStatuses.EMPTY;
    else {
      details = { ...found };
      if (details.experiments) {
        details.experiments = details.experiments.map(
          (experiment) =>
            experimentList.find(
              (fullExperiment) => fullExperiment.id === experiment
            ) || {}
        );
        details.experiments = (
          <>
            {details.experiments.map((experiment, index) => (
              <Fragment key={index}>
                <ExperimentLink experiment={experiment} />
                <br />
              </Fragment>
            ))}
          </>
        );
      }
      details = humanizeKeys(details);
    }
  }

  return (
    <>
      <Header />
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

const mapStateToProps = (state) => ({
  sampleList: state.samples.list,
  experimentList: state.experiments.list
});

Sample = connect(mapStateToProps)(Sample);

export default Sample;
