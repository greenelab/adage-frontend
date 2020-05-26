import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import { GroupButtons } from '../../group';
import SampleLink from '../../../sample/link';
import { groupSample } from '../../../../actions/samples';
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

let Heatmap = ({ activities, group }) => {
  // internal state
  const [start, setStart] = useState(null);
  const { sampleOrder, signatureOrder } = useContext(OrderContext);
  const mounted = useMounted();
  const history = useHistory();

  // detect prop change
  const mountedChanged = useDiff(mounted);
  const activitiesChanged = useDiff(activities);
  const samplesChanged = useDiff(sampleOrder);
  const signaturesChanged = useDiff(signatureOrder);

  // get list of samples from activities in sampleOrder order
  const orderedSamples = useMemo(() => {
    const samples = activities.map((activity) => activity.sample);
    return sampleOrder
      .map((id) => samples.find((sample) => sample.id === id))
      .filter((sample) => sample);
  }, [activities, sampleOrder]);

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

    // while components render, activities might be updated before order is.
    // if this array empty, sample order is out of sync with activities, and
    // heatmap shouldn't be drawn
    if (!orderedSamples.length)
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
        history.push(getLinkPath({ location, to, search }).full);
      });
    cells.exit().remove();
  }, [
    mountedChanged,
    activities,
    orderedSamples.length,
    sampleOrder,
    signatureOrder,
    activitiesChanged,
    samplesChanged,
    signaturesChanged,
    width,
    height,
    history
  ]);

  // reset shift select when sample order changes
  useEffect(() => {
    setStart(null);
  }, [samplesChanged]);

  return (
    <div id='activities'>
      <div className='activities_header weight_medium'>
        <div>Group</div>
        <div>Sample</div>
        <div>Signatures</div>
      </div>
      <div className='activities_row'>
        <div>
          {orderedSamples.map((sample, rowIndex) => (
            <GroupButtons
              key={rowIndex}
              sample={sample}
              onClick={(event, groupIndex) => {
                if (!event.shiftKey || !start)
                  setStart({ rowIndex, groupIndex });
                else {
                  const from = Math.min(start.rowIndex, rowIndex);
                  const to = Math.max(start.rowIndex, rowIndex);
                  group({
                    index: groupIndex,
                    ids: sampleOrder.slice(from, to + 1)
                  });
                }
              }}
            />
          ))}
        </div>
        <div>
          {orderedSamples.map((sample, index) => (
            <div key={index}>
              <SampleLink sample={sample} extraTooltip={sample.description} />
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

const mapDispatchToProps = (dispatch) => ({
  group: (...args) => dispatch(groupSample(...args))
});

Heatmap = connect(null, mapDispatchToProps)(Heatmap);

export default Heatmap;
