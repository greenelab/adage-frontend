import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import * as d3 from 'd3';

import { stringifyObject } from '../../../../util/object';
import { uniqueMap } from '../../../../util/object';

import './index.css';

const cellWidth = 5;
const cellHeight = 30;
const horizontalSpacing = 0;
const verticalSpacing = 2;

// sample activity heatmap

const Heatmap = ({ activities, samples, signatures }) => {
  // internal state
  const [mounted, setMounted] = useState(false);

  const sampleNames = uniqueMap(activities, (activity) => activity.sampleName);
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

    const svg = d3.select('#heatmap svg');

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
      .selectAll('.heatmap_cell')
      .data(activities, (d) => d.signature + ':' + d.sample);
    cells
      .enter()
      .append('rect')
      .attr('class', 'heatmap_cell')
      .merge(cells)
      .attr('x', (d) => x(d.signature) + horizontalSpacing - 0.25)
      .attr('y', (d) => y(d.sample) + verticalSpacing - 0.25)
      .attr('width', cellWidth - horizontalSpacing * 2 + 0.5)
      .attr('height', cellHeight - verticalSpacing * 2 + 0.5)
      .attr('fill', (d) => colorScale(d.value))
      .attr('aria-label', (d) =>
        stringifyObject({
          sample: d.sampleName,
          signature: d.signatureName,
          activity: d.value
        })
      )
      .attr('data-tooltip-speed', 10);
    cells.exit().remove();
  }, [mounted, activities, samples, signatures, width, height]);

  return (
    <div id='heatmap'>
      <div className='heatmap_left_col medium' style={{ height: cellHeight }}>
        Samples
      </div>
      <div className='heatmap_right_col medium' style={{ height: cellHeight }}>
        Signatures
      </div>
      <div className='heatmap_left_col'>
        {sampleNames.map((name, index) => (
          <div
            key={index}
            className='heatmap_row'
            style={{ height: cellHeight }}
          >
            <span className='nowrap' aria-label=''>
              {name}
            </span>
          </div>
        ))}
      </div>
      <div className='heatmap_right_col'>
        <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} />
      </div>
    </div>
  );
};

export default Heatmap;
