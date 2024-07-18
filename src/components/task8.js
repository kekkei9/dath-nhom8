import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./task8.css";

const data = [
  { gender: "Nam", play: 360, notPlay: 810 },
  { gender: "Nữ", play: 366, notPlay: 856 },
];

const Task8 = () => {
  const svgRef = useRef();
  const legendRef = useRef();
  const notesRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 100, left: 60 };
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
      .domain(data.map((d) => d.gender))
      .rangeRound([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.play + d.notPlay)])
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

    const barGroups = svg
      .selectAll(".bar-group")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "bar-group")
      .attr("transform", (d) => `translate(${x(d.gender)},0)`);

    barGroups
      .append("rect")
      .attr("class", "bar play")
      .attr("x", 0)
      .attr("y", (d) => y(d.play))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.play))
      .attr("fill", "steelblue");

    barGroups
      .append("rect")
      .attr("class", "bar not-play")
      .attr("x", 0)
      .attr("y", (d) => y(d.play + d.notPlay))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.notPlay))
      .attr("fill", "orange");

    const legend = d3
      .select(legendRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", 40)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", "steelblue");

    legend
      .append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .text("Chơi thể thao");

    legend
      .append("rect")
      .attr("x", 200)
      .attr("y", 0)
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", "orange");

    legend
      .append("text")
      .attr("x", 220)
      .attr("y", 9)
      .attr("dy", ".35em")
      .text("Không chơi thể thao");

    const notes = d3.select(notesRef.current);

    notes
      .append("div")
      .attr("class", "note")
      .html(
        `Nam - Chơi: ${data[0].play}, Không chơi: ${data[0].notPlay}<br>Nữ - Chơi: ${data[1].play}, Không chơi: ${data[1].notPlay}`
      );

    return () => {
      d3.select(svgRef.current).selectAll("*").remove();
      d3.select(legendRef.current).selectAll("*").remove();
      d3.select(notesRef.current).selectAll("*").remove();
    };
  }, []);

  return (
    <div>
      <h2>Tỉ lệ chơi thể thao giữa nam và nữ</h2>
      <svg ref={svgRef}></svg>
      <div id="legend" ref={legendRef}></div>
      <div id="notes" ref={notesRef}></div>
    </div>
  );
};

export default Task8;
