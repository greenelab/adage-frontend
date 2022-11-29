import React from "react";
import { connect } from "react-redux";

import FetchAlert from "../../../components/fetch-alert";
import Table from "./table";
import Controls from "./controls";
import { isString } from "../../../util/types";
import { isArray } from "../../../util/types";
import { arrayMin, arrayMax } from "../../../util/math";

import "./index.css";

// signature activities section

let Activities = ({ activities }) => (
  <>
    {isString(activities) && (
      <FetchAlert status={activities} subject="activities" />
    )}
    {isArray(activities) && (
      <>
        <Table />
        <Controls />
      </>
    )}
  </>
);

const mapStateToProps = (state) => ({
  activities: state.signatures.activities,
});

Activities = connect(mapStateToProps)(Activities);

export default Activities;

export const mapActivities = (activities, state) => {
  if (
    !isArray(activities) ||
    !activities.length ||
    !isArray(state.experiments.list) ||
    !state.experiments.list.length
  )
    return { bySignature: {}, byExperiment: [] };

  // get all activities in signature, and min/max
  const values = activities.map((activity) => activity.value);
  const min = arrayMin(values); // Math.min(...values);
  const max = arrayMax(values); // Math.max(...values);
  const bySignature = { values, min, max };

  // bring sample info out of activities and into map
  const activityMap = {};
  for (const { sample, value } of activities) activityMap[sample] = value;

  // get activities by experiment
  const byExperiment = state.experiments.list
    .map((experiment) => {
      // get experiment samples info
      const samples = experiment.samples;
      // get activity value of each sample
      const values = samples
        .map((sample) => activityMap[sample])
        .filter((value) => value);
      // get min/max/range of values
      const min = arrayMin(values); // Math.min(...values);
      const max = arrayMax(values); // Math.max(...values);
      const range = max - min;
      // get silhouette score
      const score = experiment.signatureScores[state.signatures.selected.id] || 0;
      // return all needed info
      return {
        id: experiment.id,
        accession: experiment.accession,
        values,
        count: values.length,
        min,
        max,
        range,
        score,
        samples,
      };
    })
    .filter((experiment) => experiment.count);

  console.log(byExperiment);

  return { bySignature, byExperiment };
};
