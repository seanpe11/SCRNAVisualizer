import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function UMAPVisualization() {
    const d3Container = useRef(null);

    useEffect(() => {
        // Define the relative path to your CSV file within the src directory
        const csvUrl = '../tests/umap_data.csv'; // Adjust if the path differs

        // Load and process the CSV file
        d3.csv(csvUrl).then(data => {
            const umapData = data.map(d => ({
                umap1: +d.umap_1,
                umap2: +d.umap_2
            }));

            if (d3Container.current) {
                // Create the SVG container
                const svg = d3.select(d3Container.current)
                    .append('svg')
                    .attr('width', 800)
                    .attr('height', 400);

                // Set dimensions and margins for the graph
                const margin = { top: 20, right: 30, bottom: 30, left: 40 };
                const width = 800 - margin.left - margin.right;
                const height = 400 - margin.top - margin.bottom;

                // Append the main group element
                const chart = svg.append('g')
                    .attr('transform', `translate(${margin.left}, ${margin.top})`);

                // Add X axis
                const x = d3.scaleLinear()
                    .domain(d3.extent(umapData, d => d.umap1))
                    .range([0, width]);
                chart.append('g')
                    .attr('transform', `translate(0, ${height})`)
                    .call(d3.axisBottom(x));

                // Add Y axis
                const y = d3.scaleLinear()
                    .domain(d3.extent(umapData, d => d.umap2))
                    .range([height, 0]);
                chart.append('g')
                    .call(d3.axisLeft(y));

                // Add dots
                chart.selectAll("dot")
                    .data(umapData)
                    .enter()
                    .append("circle")
                    .attr("cx", d => x(d.umap1))
                    .attr("cy", d => y(d.umap2))
                    .attr("r", 5)
                    .style("fill", "#69b3a2");
            }
        });
    }, []);

    return (
        <div>
        <svg ref= { d3Container } />
        </div>
    );
}

export default UMAPVisualization;
