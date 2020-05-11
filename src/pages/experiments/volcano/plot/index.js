import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';

import Input from '../../../../components/input';
import { searchSignatures } from '../../../../reducers/signatures';
import { useMounted } from '../../../../util/hooks';
import { useBbox } from '../../../../util/hooks';
import { stringifyObject } from '../../../../util/object';
import { transformString } from '../../../../util/string';
import { getLinkPath } from '../../../../components/clickable';

import { ReactComponent as DiamondIcon } from '../../../../images/diamond.svg';
import { ReactComponent as SpadeIcon } from '../../../../images/spade.svg';
import { ReactComponent as ArrowLeftIcon } from '../../../../images/long-arrow-left.svg';
import { ReactComponent as ArrowRightIcon } from '../../../../images/long-arrow-right.svg';

import './index.css';

const radius = 5;
const axisLabelOffset = 40;

export let svg;

// volcano plot

let Plot = ({ volcano }) => {
  // internal state
  const mounted = useMounted();
  const [search, setSearch] = useState('');
  const [bbox, ref] = useBbox();

  const width = Math.round(bbox?.width || 0);
  const height = Math.round(bbox?.height || 0);

  volcano = useMemo(() => {
    const highlighted = searchSignatures(search, volcano);
    if (highlighted.length === volcano.length)
      return volcano;
    else {
      return volcano.map((signature) => ({
        ...signature,
        highlighted: highlighted.includes(signature) ? true : false
      }));
    }
  }, [search, volcano]);

  // redraw volcano
  useEffect(() => {
    if (!mounted)
      return;

    svg = d3.select('#volcano');

    // find x and y domains (min/max values)
    const xValues = volcano.map((d) => d.meanDiff);
    const yValues = volcano.map((d) => d.pValueTrans);
    const xMax = Math.max(
      Math.abs(Math.min(...xValues)),
      Math.abs(Math.max(...xValues))
    );
    const yMax = Math.max(...yValues);

    // x axis scale
    const xScale = d3
      .scaleLinear()
      .range([0, width])
      .domain([-xMax * 1.1, xMax * 1.1]);

    // y axis scale
    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, yMax * 1.1]);

    // x axis marks
    svg
      .select('#volcano_x_axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale).tickArguments([10]));

    // y axis marks
    svg.select('#volcano_y_axis').call(d3.axisLeft(yScale).tickArguments([10]));

    // draw dots
    const dot = svg
      .select('#volcano_dots')
      .selectAll('.volcano_dot')
      .data(volcano, (d) => d.meanDiff + ':' + d.pValueTrans);
    dot
      .enter()
      .append('circle')
      .attr('class', 'volcano_dot')
      .merge(dot)
      .sort((a, b) => a.highlighted - b.highlighted)
      .attr('cx', (d) => xScale(d.meanDiff))
      .attr('cy', (d) => yScale(d.pValueTrans))
      .attr('r', radius)
      .attr('fill', (d) =>
        d.highlighted === false ? 'var(--light-gray)' : 'var(--green)')
      .attr('stroke', (d) => (d.highlighted === true ? 'var(--black)' : ''))
      .attr('stroke-width', (d) => (d.highlighted === true ? '2' : ''))
      .attr('aria-label', (d) =>
        stringifyObject({
          signature: d.name,
          meanDiff: d.meanDiff.toFixed(5),
          pValue: d.pValue.toFixed(5)
        }))
      .attr('data-tooltip-speed', 10)
      .on('click', (d) => {
        const location = window.location;
        const to = '/signatures';
        const search = { signature: d.id };
        window.location = getLinkPath({ location, to, search }).full;
      });
    dot.exit().remove();
  }, [mounted, width, height, volcano]);

  return (
    <>
      <Input
        className='volcano_search'
        placeholder='search signatures'
        onChange={(value) => setSearch(value)}
      />
      <svg ref={ref} id='volcano' xmlns='http://www.w3.org/2000/svg'>
        <style>
          {`
            * {
              --green: #26a36c;
              --blue: #2196f3;
              --red: #e91e63;
              --black: #000000;
              --dark-gray: #606060;
              --gray: #a0a0a0;
              --light-gray: #e0e0e0;
              --off-white: #f0f0f0;
              --white: #ffffff;
            }
          `}
        </style>
        <g
          id='volcano_view'
          transform={transformString(
            'translate',
            width / 2,
            height / 2,
            'scale',
            Math.min(
              width / (width + axisLabelOffset * 2 * 2),
              height / (height + axisLabelOffset * 2)
            ),
            'translate',
            -width / 2,
            -height / 2
          )}
        >
          <text
            id='y_axis_label'
            textAnchor='middle'
            dominantBaseline='middle'
            x={0}
            y={0}
            transform={transformString(
              'translate',
              -axisLabelOffset * 1.5,
              height / 2,
              'rotate',
              -90
            )}
          >
            - log10 p value
          </text>
          <text
            id='x_axis_label'
            textAnchor='middle'
            dominantBaseline='middle'
            x={0}
            y={0}
            transform={transformString(
              'translate',
              width / 2,
              height + axisLabelOffset
            )}
          >
            diff in mean activity
          </text>
          <g id='volcano_dots'></g>
          <g id='volcano_x_axis'></g>
          <g id='volcano_y_axis'></g>
          <ArrowLeftIcon
            className='flip_horizontal'
            x={-40 / 2 + width / 2 - 100 - 35}
            y={-20 / 2 + height + axisLabelOffset}
            color='var(--blue)'
          />
          <DiamondIcon
            x={-15 / 2 + width / 2 - 100}
            y={-15 / 2 + height + axisLabelOffset}
            color='var(--blue)'
          />
          <SpadeIcon
            x={-15 / 2 + width / 2 + 100}
            y={-15 / 2 + height + axisLabelOffset}
            color='var(--red)'
          />
          <ArrowRightIcon
            x={-40 / 2 + width / 2 + 100 + 35}
            y={-20 / 2 + height + axisLabelOffset}
            color='var(--red)'
          />
        </g>
      </svg>
    </>
  );
};

const mapStateToProps = (state) => ({
  volcano: state.samples.volcano
});

Plot = connect(mapStateToProps)(Plot);

export default Plot;
