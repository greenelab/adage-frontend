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

let Experiment = ({ selectedExperiment }) => (
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
        {isObject(selectedExperiment) && <Details data={selectedExperiment} />}
        {isString(selectedExperiment) && (
          <FetchAlert
            status={selectedExperiment}
            subject='experiment details'
          />
        )}
      </Section>
    </Main>
    <Footer />
  </>
);

const mapStateToProps = (state) => {
  let selectedExperiment = state.experiments.selected;

  if (!selectedExperiment?.accession)
    selectedExperiment = actionStatuses.EMPTY;
  else if (!experimentIsLoaded(selectedExperiment))
    selectedExperiment = state.experiments.list;
  else if (isObject(selectedExperiment)) {
    selectedExperiment = filterKeys(selectedExperiment, ['maxSimilarityField']);
    if (selectedExperiment.samples) {
      selectedExperiment.samples = (
        <>
          {selectedExperiment.samples.map((sample, index) => (
            <Fragment key={index}>
              <SampleLink sample={sample} />
              <br />
            </Fragment>
          ))}
        </>
      );
    }
    selectedExperiment = humanizeKeys(selectedExperiment);
  }

  return { selectedExperiment };
};

Experiment = connect(mapStateToProps)(Experiment);

export default Experiment;
