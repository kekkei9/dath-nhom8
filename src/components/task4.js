import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './task4.css';

const Task4 = () => {
    const svgRef = useRef();

    useEffect(() => {
        // Dữ liệu mẫu
        const data = [
            { gender: 'Giới tính nam', average: 1.918678895 },
            { gender: 'Giới tính nữ', average: 1.89422531 }
        ];

        // Kích thước của SVG và margin
        const svgWidth = 600;
        const svgHeight = 400;
        const margin = { top: 50, right: 30, bottom: 40, left: 50 };

        // Chiều rộng và chiều cao của biểu đồ
        const width = svgWidth - margin.left - margin.right;
        const height = svgHeight - margin.top - margin.bottom;

        // Chọn SVG và thiết lập kích thước
        const svg = d3.select(svgRef.current)
            .attr("width", svgWidth)
            .attr("height", svgHeight);

        // Thêm tiêu đề vào khung biểu đồ
        svg.append("text")
            .attr("class", "title")
            .attr("x", svgWidth / 2)
            .attr("y", margin.top / 2) // Điều chỉnh y để đưa tiêu đề cao hơn
            .text("Điểm trung bình theo giới tính");

        // Tạo nhóm chứa biểu đồ
        const chart = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Tạo trục X
        const x = d3.scaleBand()
            .domain(data.map(d => d.gender))
            .range([0, width])
            .padding(0.7);  // Giảm padding để cột nhỏ hơn

        chart.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("class", "axis-label");

        // Tạo trục Y
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.average)])
            .nice() // Để giá trị trục Y đẹp hơn
            .range([height, 0]);

        chart.append("g")
            .call(d3.axisLeft(y).ticks(5)) // Chọn số lượng tick trục Y
            .selectAll("text")
            .attr("class", "axis-label");

        // Tạo các thanh cột
        chart.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.gender))
            .attr("y", d => y(d.average))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.average));

        // Thêm nhãn cho các thanh cột
        chart.selectAll(".label")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "label")
            .attr("x", d => x(d.gender) + x.bandwidth() / 2)
            .attr("y", d => y(d.average) - 5)
            .attr("text-anchor", "middle")
            .text(d => d.average.toFixed(2));

    }, []);

    return (
        <div>
            <svg ref={svgRef}></svg>
        </div>
    );
};

export default Task4;
