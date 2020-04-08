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

let Sample = ({ samples }) => {
  const match = useRouteMatch();
  const id = match.params.id;

  let details;

  if (isString(samples))
    details = samples;
  else if (isArray(samples)) {
    const found = samples.find((sample) => String(sample.id) === String(id));
    if (!found)
      details = actionStatuses.EMPTY;
    else {
      details = { ...found };
      if (details.experiments) {
        details.experiments = (
          <>
            {details.experiments.map((experiment, index) => (
              <Fragment key={index}>
                <ExperimentLink experiment={{ accession: experiment }} />
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

const mapStateToProps = (state) => ({ samples: state.samples.list });

Sample = connect(mapStateToProps)(Sample);

export default Sample;
