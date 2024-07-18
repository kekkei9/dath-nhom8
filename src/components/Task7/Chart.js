import * as d3 from "d3";
import dataSource from "../../Dataset/Student_performance_data _.csv";

const rawData = await d3.csv(dataSource);
const processedData = rawData.map(({ Absences, GPA }) => ({ Absences, GPA }));

// Set the dimensions and margins of the graph
const margin = { top: 10, right: 30, bottom: 60, left: 60 };
const width = 800 + margin.left + margin.right;
const height = 400 + margin.top + margin.bottom;

// Create the SVG container.
const svg_chart = d3
  .create("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [0, 0, width, height])
  .attr("style", "max-width: 100%; height: auto;");

// Add X axis
const xScale = d3
  .scaleLinear()
  .domain([0, 29])
  .range([0, width - margin.right - margin.left - 30]);
// Add y axis
const yScale = d3
  .scaleLinear()
  .domain([0, 4])
  .range([height - margin.bottom, 0]);

const g = svg_chart
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

g.append("g")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(xScale));

g.append("g").call(d3.axisLeft(yScale)).attr("transform", `translate(0,0)`);

// svg_chart
//   .append("text")
//   .attr("x", width / 2)
//   .attr("y", 30)
//   .attr("text-anchor", "middle")
//   .style("font-family", "Helvetica")
//   .style("font-size", 20)
//   .text("Scatter Plot");

// X label
svg_chart
  .append("text")
  .attr("x", width / 2 - 30)
  .attr("y", height - margin.bottom + 50)
  .attr("text-anchor", "middle")
  .style("font-family", "Helvetica")
  .style("font-size", 14)
  .text("Absences");

// Y label
svg_chart
  .append("text")
  .attr("text-anchor", "middle")
  .attr("transform", "translate(20," + (height / 2 - 20) + ")rotate(-90)")
  .style("font-family", "Helvetica")
  .style("font-size", 14)
  .text("GPA");

// Add dots
g.selectAll("dot")
  .data(processedData)
  .enter()
  .append("circle")
  .attr("cx", (d) => xScale(d.Absences))
  .attr("cy", (d) => yScale(d.GPA))
  .attr("r", 2)
  .style("fill", "#0071f0");

const Chart = { svg_chart: svg_chart.node() };
export default Chart;
