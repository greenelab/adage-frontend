import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import { isArray } from '../../../../util/types';
import { stringifyObject } from '../../../../util/object';

import './index.css';

const cellWidth = 5;
const cellHeight = 30;
const horizontalSpacing = 0;
const verticalSpacing = 2;

// sample activity heatmap

let Heatmap = ({ activities }) => {
  // internal state
  const [mounted, setMounted] = useState(false);

  // get relevant properties
  const samples = d3.map(activities, (d) => d.sample).keys();
  const sampleNames = d3.map(activities, (d) => d.sampleName).keys();
  const signatures = d3.map(activities, (d) => d.signature).keys();
  const width = signatures.length * cellWidth;
  const height = samples.length * cellHeight;

  // set has mounted flag
  useEffect(() => {
    setMounted(true);
  }, []);

  // redraw heatmap
  useEffect(() => {
    if (!mounted)
      return;

    const svg = d3.select('#heatmap_grid > svg');

    // find min and max values
    const extent = d3.extent(activities.map((d) => d.value));

    // cell value to color mapping
    const colorScale = d3
      .scaleSequential()
      .interpolator(d3.interpolateCool)
      .domain(extent);

    // x axis scale
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(signatures);

    // y axis scale
    const y = d3
      .scaleBand()
      .range([height, 0])
      .domain(samples);

    // draw cells
    const cells = svg
      .selectAll('.cell')
      .data(activities, (d) => d.signature + ':' + d.sample);
    cells
      .enter()
      .append('rect')
      .attr('class', 'cell')
      .merge(cells)
      .attr('x', (d) => x(d.signature) + horizontalSpacing - 0.25)
      .attr('y', (d) => y(d.sample) + verticalSpacing - 0.25)
      .attr('width', cellWidth - horizontalSpacing * 2 + 0.5)
      .attr('height', cellHeight - verticalSpacing * 2 + 0.5)
      .attr('fill', (d) => colorScale(d.value))
      .attr('aria-label', (d) =>
        stringifyObject({ signature: d.signatureName, activity: d.value })
      )
      .attr('data-tooltip-delay', 10);
    cells.exit().remove();
  }, [mounted, activities, samples, signatures, width, height]);

  return (
    <div id='heatmap'>
      <div id='heatmap_list'>
        {sampleNames.map((name, index) => (
          <div
            key={index}
            className='heatmap_list_row'
            style={{ height: cellHeight }}
          >
            <span className='nowrap' aria-label=''>
              {name}
            </span>
          </div>
        ))}
      </div>
      <div id='heatmap_grid'>
        <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  activities: mapActivities(state.sample.activities, state)
});

Heatmap = connect(mapStateToProps)(Heatmap);

export default Heatmap;

export const mapActivities = (activities, state) =>
  isArray(activities) ?
    activities.map((activity) => mapActivity(activity, state)) :
    activities;

export const mapActivity = (activity, state) => ({
  ...activity,
  sampleName: isArray(state.sample.list) ?
    (state.sample.list.find((sample) => sample.id === activity.sample) || {})
      .name :
    '',
  signatureName: isArray(state.signature.list) ?
    (
      state.signature.list.find(
        (signature) => signature.id === activity.signature
      ) || {}
    ).name :
    ''
});
