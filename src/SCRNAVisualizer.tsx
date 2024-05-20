import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function UMAPVisualization({ csvUrl }: { csvUrl: string; }) {
  const d3Container = useRef(null);

  useEffect(() => {
    // Define the relative path to your CSV file within the src directory
    // Load and process the CSV file
    d3.csv(csvUrl).then(data => {
      const umapData = data.map(d => ({
        umap1: +d.UMAP_1,
        umap2: +d.UMAP_2
      }));

      if (d3Container.current) {
        // Remove any existing SVG to avoid multiple SVGs
        d3.select(d3Container.current).selectAll('svg').remove();

        // Create the SVG container
        const svg = d3.select(d3Container.current)
          .append('svg')
          .attr('width', 800)  // Adjusted width
          .attr('height', 600); // Adjusted height

        // Set dimensions and margins for the graph
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const width = 800 - margin.left - margin.right;
        const height = 600 - margin.top - margin.bottom;

        // Append the main group element
        const chart = svg.append('g')
          .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // Add X axis
        const x = d3.scaleLinear()
          .domain(d3.extent(umapData, d => d.umap1) as [number, number] || [1, 1])
          .range([0, width]);
        chart.append('g')
          .attr('transform', `translate(0, ${height})`)
          .call(d3.axisBottom(x));

        // Add Y axis
        const y = d3.scaleLinear()
          .domain(d3.extent(umapData, d => d.umap2) as [number, number] || [1, 1])
          .range([height, 0]);
        chart.append('g')
          .call(d3.axisLeft(y));

        // Add dots
        chart.selectAll("circle")
          .data(umapData)
          .enter()
          .append("circle")
          .attr("cx", d => x(d.umap1))
          .attr("cy", d => y(d.umap2))
          .attr("r", 1)  // Adjusted radius for better visualization
          .style("fill", "#69b3a2");
      }
    });
  }, []);

  return (
    <div ref={d3Container} />
  );
}

export default UMAPVisualization;
