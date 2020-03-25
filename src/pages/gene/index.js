import React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useRouteMatch } from "react-router";

import SampleLink from "../sample/link";
import Header from "../header";
import Main from "../main";
import Footer from "../footer";
import Section from "../../components/section";
import Details from "../../components/details";
import FetchAlert from "../../components/fetch-alert";
import { getGeneDetails } from "../../actions/genes";
import { isObject } from "../../util/types";
import { isString } from "../../util/types";
import { filterKeys } from "../../util/object";
import { humanizeKeys } from "../../util/object";

import { ReactComponent as GeneIcon } from "../../images/gene.svg";

import "./index.css";

// gene details page

let Gene = ({ details, getDetails }) => {
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
              <GeneIcon />
              <span>Gene Details</span>
            </>
          }
        >
          {isObject(details) && <Details data={details} />}
          {isString(details) && (
            <FetchAlert status={details} subject="gene details" />
          )}
        </Section>
      </Main>
      <Footer />
    </>
  );
};

const mapStateToProps = state => {
  let details = state.genes.details;

  if (isObject(details)) {
    details = filterKeys(details, ["maxSimilarityField"]);
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

const mapDispatchToProps = dispatch => ({
  getDetails: (...args) => dispatch(getGeneDetails(...args))
});

Gene = connect(mapStateToProps, mapDispatchToProps)(Gene);

export default Gene;
