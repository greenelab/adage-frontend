import React from 'react';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Link from '../../components/link';
import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import Section from '../../components/section';
import Details from '../../components/details';
import FetchAlert from '../../components/fetch-alert';
import { getSampleDetails } from '../../actions/samples.js';
import { isObject } from '../../util/types.js';
import { isString } from '../../util/types.js';
import { humanizeObject } from '../../util/object.js';
import { flattenObject } from '../../util/object.js';

import './index.css';

let Sample = ({ match, details, getDetails }) => {
  const id = match.params.id;

  useEffect(() => {
    getDetails({ id: id });
  }, [id, getDetails]);

  return (
    <>
      <Header justTitle />
      <Main>
        <Section text='Sample Details'>
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
  let details = state.sample.details;

  if (isObject(details)) {
    details = flattenObject(details);
    if (details.experiments) {
      details.experiments = (
        <>
          {details.experiments.map((experiment, index) => (
            <Fragment key={index}>
              <Link
                to={'/experiment/' + experiment}
                newTab
                button={false}
                text={experiment || '-'}
              />
              <br />
            </Fragment>
          ))}
        </>
      );
    }
    details = humanizeObject(details);
  }

  return { details };
};

const mapDispatchToProps = (dispatch) => ({
  getDetails: (...args) => dispatch(getSampleDetails(...args))
});

Sample = withRouter(Sample);
Sample = connect(mapStateToProps, mapDispatchToProps)(Sample);

export default Sample;
