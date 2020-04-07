import React from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';

import ExperimentLink from '../experiment/link';
import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import Section from '../../components/section';
import Details from '../../components/details';
import FetchAlert from '../../components/fetch-alert';
import { sampleIsLoaded } from '../../reducers/samples';
import { actionStatuses } from '../../actions/fetch';
import { isObject } from '../../util/types';
import { isString } from '../../util/types';
import { filterKeys } from '../../util/object';
import { humanizeKeys } from '../../util/object';

import { ReactComponent as SampleIcon } from '../../images/sample.svg';

import './index.css';

// sample sample page

let Sample = ({ selectedSample }) => (
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
        {isObject(selectedSample) && <Details data={selectedSample} />}
        {isString(selectedSample) && (
          <FetchAlert status={selectedSample} subject='sample details' />
        )}
      </Section>
    </Main>
    <Footer />
  </>
);

const mapStateToProps = (state) => {
  let selectedSample = state.samples.selected[0];

  if (!selectedSample?.id)
    selectedSample = actionStatuses.EMPTY;
  else if (!sampleIsLoaded(selectedSample))
    selectedSample = state.samples.list;
  else if (isObject(selectedSample)) {
    selectedSample = filterKeys(selectedSample, ['id']);
    if (selectedSample.experiments) {
      selectedSample.experiments = (
        <>
          {selectedSample.experiments.map((experiment, index) => (
            <Fragment key={index}>
              <ExperimentLink experiment={{ accession: experiment }} />
              <br />
            </Fragment>
          ))}
        </>
      );
    }
    selectedSample = humanizeKeys(selectedSample);
  }

  return { selectedSample };
};

Sample = connect(mapStateToProps)(Sample);

export default Sample;
