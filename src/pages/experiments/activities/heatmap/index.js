import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import * as d3 from 'd3';

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
  const mounted = useMounted();
  const mountedChanged = useDiff(mounted);
  const { sampleOrder, signatureOrder } = useContext(OrderContext);
  const activitiesChanged = useDiff(JSON.stringify(activities));
  const samplesChanged = useDiff(JSON.stringify(sampleOrder));
  const signaturesChanged = useDiff(JSON.stringify(signatureOrder));

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

    svg = d3.select('#heatmap svg');

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
    <div id='heatmap'>
      <div
        className='heatmap_left_col weight_medium'
        style={{ height: cellHeight }}
      >
        Samples
      </div>
      <div
        className='heatmap_right_col weight_medium'
        style={{ height: cellHeight }}
      >
        Signatures
      </div>
      <div className='heatmap_left_col'></div>
      <div className='heatmap_right_col'>
        <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} />
      </div>
    </div>
  );
};

export default Heatmap;
