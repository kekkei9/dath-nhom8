import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data, listenMusic, title }) => {
    const chartRef = useRef();

    useEffect(() => {
        const filteredData = data.filter(d => d.listen_music === listenMusic);

        const svg = d3.select(chartRef.current)
            .attr("width", 300 + 40 + 20)
            .attr("height", 300 + 20 + 30)
            .append("g")
            .attr("transform", `translate(40,20)`);

        const x = d3.scaleBand()
            .domain(filteredData.map(d => d.category))
            .range([0, 300])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(filteredData, d => d.count)])
            .nice()
            .range([300, 0]);

        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,300)`)
            .call(d3.axisBottom(x));

        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(y));

        const bars = svg.selectAll(".bar")
            .data(filteredData)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.category))
            .attr("y", d => y(d.count))
            .attr("width", x.bandwidth())
            .attr("height", d => 300 - y(d.count))
            .attr("fill", "#1f77b4");

        svg.selectAll(".text")
            .data(filteredData)
            .enter()
            .append("text")
            .attr("class", "label")
            .attr("x", d => x(d.category) + x.bandwidth() / 2)
            .attr("y", d => y(d.count) - 5)
            .attr("text-anchor", "middle")
            .text(d => d.count.toFixed(2));
    }, [data, listenMusic]);

    return (
        <div className="chart">
            <div className="chart-title">{title}</div>
            <svg ref={chartRef}></svg>
        </div>
    );
};

export default BarChart;
