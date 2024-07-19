import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './SportsBarChart.css';

const data = [
    { category: 'Chơi', listen_music: 0, count: 1.986380882 },
    { category: 'Không chơi', listen_music: 0, count: 1.871239565 },
];

const width = 300;
const height = 300;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const barColor = "#1f77b4";

const SportsBarChart = ({ listen_music, title }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        drawBarChart(chartRef.current, listen_music, title);
    }, [listen_music, title]);

    const drawBarChart = (container, listen_music, title) => {
        const filteredData = data.filter(d => d.listen_music === listen_music);

        const svg = d3.select(container)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .domain(filteredData.map(d => d.category))
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(filteredData, d => d.count)])
            .nice()
            .range([height, 0]);

        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(y));

        svg.selectAll(".bar")
            .data(filteredData)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.category))
            .attr("y", d => y(d.count))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.count))
            .attr("fill", barColor);

        svg.selectAll(".label")
            .data(filteredData)
            .enter()
            .append("text")
            .attr("class", "label")
            .attr("x", (d) => x(d.category) + x.bandwidth() / 2)
            .attr("y", (d) => y(d.count) - 5)
            .attr("text-anchor", "middle")
            .text((d) => d.count.toFixed(2));
    };

    return (
        <div className="chart-container">
            <div className="chart" ref={chartRef}>
                <div className="chart-title">{title}</div>
            </div>
        </div>
    );
};

export default SportsBarChart;
