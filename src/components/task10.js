import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./task10.css";

// Dữ liệu mẫu
const data = [
  { enthnicity: "African American", averageParentalSupport: 2.0507 },
  { enthnicity: "Caucasian", averageParentalSupport: 2.1201 },
  { enthnicity: "Asian", averageParentalSupport: 2.1638 },
  { enthnicity: "Other", averageParentalSupport: 2.2027 },
];

const Task10 = () => {
  const svgRef = useRef();

  useEffect(() => {
    // Kích thước của SVG và margin
    const svgWidth = 600;
    const svgHeight = 400;
    const margin = { top: 50, right: 30, bottom: 40, left: 50 };

    // Chiều rộng và chiều cao của biểu đồ
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    // Chọn SVG và thiết lập kích thước
    const svg = d3
      .select(svgRef.current)
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    // Thêm tiêu đề vào khung biểu đồ
    svg
      .append("text")
      .attr("class", "title")
      .attr("x", svgWidth / 2)
      .attr("y", margin.top / 2) // Điều chỉnh y để đưa tiêu đề cao hơn
      .text("Mức độ hỗ trợ trung bình của phụ huynh của từng dân tộc");

    // Tạo nhóm chứa biểu đồ
    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Tạo trục X
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.enthnicity))
      .range([0, width])
      .padding(0.7); // Giảm padding để cột nhỏ hơn

    chart
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("class", "axis-label");

    // Tạo trục Y
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.averageParentalSupport)])
      .nice() // Để giá trị trục Y đẹp hơn
      .range([height, 0]);

    chart
      .append("g")
      .call(d3.axisLeft(y).ticks(5)) // Chọn số lượng tick trục Y
      .selectAll("text")
      .attr("class", "axis-label");

    // Tạo các thanh cột
    chart
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.enthnicity))
      .attr("y", (d) => y(d.averageParentalSupport))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.averageParentalSupport))
      .attr("fill", "steelblue");

    // Thêm nhãn cho các thanh cột
    chart
      .selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", (d) => x(d.enthnicity) + x.bandwidth() / 2)
      .attr("y", (d) => y(d.averageParentalSupport) - 5)
      .attr("text-anchor", "middle")
      .text((d) => d.averageParentalSupport.toFixed(2));
  }, []);

  return (
    <div>
      <h2>Task 10: Mức độ hỗ trợ trung bình của phụ huynh của từng dân tộc</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Task10;
