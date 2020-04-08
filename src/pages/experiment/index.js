import React from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router';

import SampleLink from '../sample/link';
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
import { filterKeys } from '../../util/object';
import { humanizeKeys } from '../../util/object';

import { ReactComponent as ExperimentIcon } from '../../images/experiment.svg';

import './index.css';

// experiment details page

let Experiment = ({ experiments }) => {
  const match = useRouteMatch();
  const accession = match.params.accession;

  let details;

  if (isString(experiments))
    details = experiments;
  else if (isArray(experiments)) {
    const found = experiments.find(
      (experiment) => String(experiment.accession) === String(accession)
    );
    if (!found)
      details = actionStatuses.EMPTY;
    else {
      details = { ...found };
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
  }

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

const mapStateToProps = (state) => ({ experiments: state.experiments.list });

Experiment = connect(mapStateToProps)(Experiment);

export default Experiment;
