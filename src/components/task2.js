import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./task2.css";

const data = [
  { age: 15, withExtracurricular: 2.8699, withoutExtracurricular: 3.0781 },
  { age: 16, withExtracurricular: 2.8326, withoutExtracurricular: 3.0819 },
  { age: 17, withExtracurricular: 2.9005, withoutExtracurricular: 3.0301 },
  { age: 18, withExtracurricular: 2.9005, withoutExtracurricular: 3.0162 },
];

const Task2 = () => {
  const svgRef = useRef();
  const legendRef = useRef();
  const notesRef = useRef();

  useEffect(() => {
    const svgRefStore = svgRef.current;
    const legendRefStore = legendRef.current;
    const notesRefStore = notesRef.current;
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
      .domain(data.map((d) => d.age))
      .rangeRound([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, (d) => d.withExtracurricular + d.withoutExtracurricular),
      ])
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
      .attr("transform", (d) => `translate(${x(d.age)},0)`);

    barGroups
      .append("rect")
      .attr("class", "bar with-extracurricular")
      .attr("x", 0)
      .attr("y", (d) => y(d.withExtracurricular))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.withExtracurricular))
      .attr("fill", "steelblue");

    barGroups
      .append("rect")
      .attr("class", "bar without-extracurricular")
      .attr("x", 0)
      .attr("y", (d) => y(d.withExtracurricular + d.withoutExtracurricular))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.withoutExtracurricular))
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
      .attr("x", -20)
      .attr("y", 0)
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", "steelblue");

    legend
      .append("text")
      .attr("x", 0)
      .attr("y", 9)
      .attr("dy", ".35em")
      .text("Tham gia hoạt động ngoại khóa");

    legend
      .append("rect")
      .attr("x", 230)
      .attr("y", 0)
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", "orange");

    legend
      .append("text")
      .attr("x", 250)
      .attr("y", 9)
      .attr("dy", ".35em")
      .text("Không tham gia hoạt động ngoại khóa");

    const notes = d3.select(notesRef.current);

    notes
      .append("div")
      .attr("class", "note")
      .html(
        data
          .map(
            ({ age, withExtracurricular, withoutExtracurricular }) =>
              `Tuổi: ${age} - Chơi: ${withExtracurricular}, Không chơi: ${withoutExtracurricular}`
          )
          .join("<br>")
      );

    return () => {
      d3.select(svgRefStore).selectAll("*").remove();
      d3.select(legendRefStore).selectAll("*").remove();
      d3.select(notesRefStore).selectAll("*").remove();
    };
  }, []);

  return (
    <div>
      <h2>
        Task 2: Việc tham gia hoạt động ngoại khóa hay không ảnh hưởng thế nào
        tới xếp loại của học sinh theo độ tuổi
      </h2>
      <svg ref={svgRef}></svg>
      <div id="legend" ref={legendRef}></div>
      <div id="notes" ref={notesRef}></div>
    </div>
  );
};

export default Task2;
