import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './task9.css';

const data = [
  { age: "15", absences: 9167 },
  { age: "16", absences: 8781 },
  { age: "17", absences: 8464 },
  { age: "18", absences: 8371 },
];

const Task9 = () => {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(data.map(d => d.age))
      .rangeRound([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.absences)])
      .nice()
      .rangeRound([height, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y).ticks(5);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

    svg.append("g").attr("class", "y axis").call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.age))
      .attr("y", d => y(d.absences))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.absences))
      .attr("fill", "steelblue");

    svg
      .append("text")
      .attr("class", "axis-label")
      .attr(
        "transform",
        `translate(${width / 2},${height + margin.bottom - 10})`
      )
      .style("text-anchor", "middle")
      .text("Độ tuổi");

    svg
      .append("text")
      .attr("class", "axis-label")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Tổng số buổi vắng");

    svg
      .selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", d => x(d.age) + x.bandwidth() / 2)
      .attr("y", d => y(d.absences) - 5)
      .text(d => d.absences)
      .attr("text-anchor", "middle");

    return () => {
      d3.select(svgRef.current).selectAll("*").remove();
    };
  }, []);

  return (
    <div>
      <h2>Tổng số buổi vắng theo độ tuổi</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Task9;
