import React from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';

import SampleLink from '../sample/link';
import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import Section from '../../components/section';
import Details from '../../components/details';
import FetchAlert from '../../components/fetch-alert';
import { experimentIsLoaded } from '../../reducers/experiments';
import { actionStatuses } from '../../actions/fetch';
import { isObject } from '../../util/types';
import { isString } from '../../util/types';
import { filterKeys } from '../../util/object';
import { humanizeKeys } from '../../util/object';

import { ReactComponent as ExperimentIcon } from '../../images/experiment.svg';

import './index.css';

// experiment details page

let Experiment = ({ experiment }) => (
  <>
    <Header />
    <Main>
      <Section
        header={
          <>
            <ExperimentIcon />
            <span>Experiment Details</span>
          </>
        }
      >
        {isObject(experiment) && <Details data={experiment} />}
        {isString(experiment) && (
          <FetchAlert status={experiment} subject='experiment details' />
        )}
      </Section>
    </Main>
    <Footer />
  </>
);

const mapStateToProps = (state) => {
  let experiment = state.experiments.selected;

  if (!experiment)
    experiment = actionStatuses.EMPTY;
  else if (!experimentIsLoaded(experiment))
    experiment = state.experiments.list;
  else if (isObject(experiment)) {
    experiment = filterKeys(experiment, ['maxSimilarityField']);
    if (experiment.samples) {
      experiment.samples = (
        <>
          {experiment.samples.map((sample, index) => (
            <Fragment key={index}>
              <SampleLink sample={sample} />
              <br />
            </Fragment>
          ))}
        </>
      );
    }
    experiment = humanizeKeys(experiment);
  }

  return { experiment };
};

Experiment = connect(mapStateToProps)(Experiment);

export default Experiment;
