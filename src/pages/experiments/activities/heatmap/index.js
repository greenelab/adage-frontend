import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import * as d3 from 'd3';

import { GroupButtons } from '../../group';
import SampleLink from '../../../sample/link';
import { OrderContext } from '../../order';
import { useMounted } from '../../../../util/hooks';
import { useDiff } from '../../../../util/hooks';
import { stringifyObject } from '../../../../util/object';
import { getLinkPath } from '../../../../components/clickable';

import './index.css';

const cellWidth = 5;
const cellHeight = 30;
const horizontalSpacing = 0;
const verticalSpacing = 2;

export let svg;

// sample activity heatmap

const Heatmap = ({ activities }) => {
  // internal state
  const { sampleOrder, signatureOrder } = useContext(OrderContext);
  const mounted = useMounted();

  // detect prop change
  const mountedChanged = useDiff(mounted);
  const activitiesChanged = useDiff(activities);
  const samplesChanged = useDiff(sampleOrder);
  const signaturesChanged = useDiff(signatureOrder);

  // get list of samples in order
  let samples = activities.map((activity) => activity.sample);
  samples = sampleOrder.map((id) => samples.find((sample) => sample.id === id));

  // heatmap dimensions
  const width = signatureOrder.length * cellWidth;
  const height = sampleOrder.length * cellHeight;

  // redraw heatmap
  useEffect(() => {
    // redraw when mounted, activities, sample order, or signature order change
    if (
      !mountedChanged &&
      !activitiesChanged &&
      !samplesChanged &&
      !signaturesChanged
    )
      return;

    svg = d3.select('#heatmap');

    // find min and max values
    const extent = d3.extent(activities.map((d) => d.value));

    // cell value to color mapping
    const colorScale = d3
      .scaleSequential()
      .interpolator(d3.interpolateCool)
      .domain(extent);

    // x axis scale
    const xScale = d3.scaleBand().range([0, width]).domain(signatureOrder);

    // y axis scale
    const yScale = d3.scaleBand().range([height, 0]).domain(sampleOrder);

    // draw cells
    const cells = svg.selectAll('.heatmap_cell').data(activities);
    cells
      .enter()
      .append('rect')
      .attr('class', 'heatmap_cell')
      .merge(cells)
      .attr('x', (d) => xScale(d.signature.id) + horizontalSpacing - 0.25)
      .attr('y', (d) => yScale(d.sample.id) + verticalSpacing - 0.25)
      .attr('width', cellWidth - horizontalSpacing * 2 + 0.5)
      .attr('height', cellHeight - verticalSpacing * 2 + 0.5)
      .attr('fill', (d) => colorScale(d.value))
      .attr('aria-label', (d) =>
        stringifyObject({
          sample: d.sample.name,
          signature: d.signature.name,
          activity: d.value.toFixed(5)
        }))
      .attr('data-tooltip-speed', 10)
      .attr('data-tooltip-h-align', 'right')
      .on('click', (d) => {
        const location = window.location;
        const to = '/signatures';
        const search = { signature: d.signature.id };
        window.location = getLinkPath({ location, to, search }).full;
      });
    cells.exit().remove();
  }, [
    mountedChanged,
    activities,
    sampleOrder,
    signatureOrder,
    activitiesChanged,
    samplesChanged,
    signaturesChanged,
    width,
    height
  ]);

  return (
    <div id='activities'>
      <div className='activities_header weight_medium'>
        <div>Group</div>
        <div>Sample</div>
        <div>Signatures</div>
      </div>
      <div className='activities_row'>
        <div>
          {samples.map((sample, index) => (
            <GroupButtons key={index} sample={sample} />
          ))}
        </div>
        <div>
          {samples.map((sample, index) => (
            <div key={index}>
              <SampleLink sample={sample} />
            </div>
          ))}
        </div>
        <div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            id='heatmap'
            width={width}
            height={height}
          />
        </div>
      </div>
    </div>
  );
};

export default Heatmap;
