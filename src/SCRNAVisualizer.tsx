// Import required libraries and types
import React, { FC, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { UmapData } from './types';

/**
 * Props interface for ScrnUmapGraph component
 */
interface ScrnUmapGraphProps {
  data: UmapData[];
  width: number;
  height: number;
}

/**
 * ScrnUmapGraph: A React component that uses D3.js to create a graph for ScRNA UMAP/t-SNE evaluation.
 */
const ScrnUmapGraph: FC<ScrnUmapGraphProps> = ({ data, width, height }) => {
  // Ref to hold the DOM element for the chart
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Initialization of D3.js chart
    const drawChart = () => {
      if (!svgRef.current) return;

      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height);

      // Margins for the chart area
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const chartWidth = width - margin.left - margin.right;
      const chartHeight = height - margin.top - margin.bottom;

      // Scales for x and y axes
      const xScale = d3.scaleLinear()
        .domain(d3.extent(data, (d) => d.x))
        .range([0, chartWidth]);

      const yScale = d3.scaleLinear()
        .domain(d3.extent(data, (d) => d.y))
        .range([chartHeight, 0]);

      // Create axes
      const xAxis = d3.axisBottom(xScale).ticks(5);
      const yAxis = d3.axisLeft(yScale).ticks(5);

      // Append the chart area
      const chartArea = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Add circles for each data point
      chartArea.selectAll('.point')
        .data(data)
        .join('circle')
        .attr('class', 'point')
        .attr('cx', (d) => xScale(d.x))
        .attr('cy', (d) => yScale(d.y))
        .attr('r', 4)
        .attr('fill', 'steelblue');

      // Add x-axis
      chartArea.append('g')
        .attr('class', 'axis axis-x')
        .attr('transform', `translate(0,${chartHeight})`)
        .call(xAxis);

      // Add y-axis
      chartArea.append('g')
        .attr('class', 'axis axis-y')
        .call(yAxis);
    };

    // Call the drawChart function when the data changes
    drawChart();
  }, [data, width, height]);

  return (
    // Render the SVG element and attach the chart to it using the ref
    <svg ref={svgRef} />
  );
};

export default ScrnUmapGraph;
