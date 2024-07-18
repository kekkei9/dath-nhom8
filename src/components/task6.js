import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './task6.css';

const data = [
    { category: 'Grade 0', listen_music: 0, count: 86 },
    { category: 'Grade 1', listen_music: 0, count: 199 },
    { category: 'Grade 2', listen_music: 0, count: 318 },
    { category: 'Grade 3', listen_music: 0, count: 333 },
    { category: 'Grade 4', listen_music: 0, count: 985 },
    { category: 'Grade 0', listen_music: 1, count: 21 },
    { category: 'Grade 1', listen_music: 1, count: 70 },
    { category: 'Grade 2', listen_music: 1, count: 73 },
    { category: 'Grade 3', listen_music: 1, count: 81 },
    { category: 'Grade 4', listen_music: 1, count: 226 }
];

const PieChart = () => {
    const pieChartRef1 = useRef();
    const pieChartRef2 = useRef();

    const drawPieChart = (container, listen_music, title) => {
        const filteredData = data.filter(d => d.listen_music === listen_music);
        const width = 400;
        const height = 400;
        const radius = Math.min(width, height) / 2;

        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.category))
            .range(['#ff7f0e', '#1f77b4', '#2ca02c', '#d62728', '#9467bd']);

        const pie = d3.pie()
            .value(d => d.count);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        const svg = d3.select(container)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        svg.append("text")
            .attr("class", "chart-title")
            .attr("text-anchor", "middle")
            .text(title);

        const arcs = svg.selectAll("arc")
            .data(pie(filteredData))
            .enter()
            .append("g")
            .attr("class", "arc");

        arcs.append("path")
            .attr("fill", d => color(d.data.category))
            .attr("d", arc);

        arcs.append("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .attr("text-anchor", "middle")
            .text(d => `${(d.data.count / d3.sum(filteredData, d => d.count) * 100).toFixed(2)}%`);
    };

    useEffect(() => {
        drawPieChart(pieChartRef1.current, 0, "Không nghe nhạc");
        drawPieChart(pieChartRef2.current, 1, "Có nghe nhạc");
    }, []);

    return (
        <div>
            <div className="title">Tỉ lệ phân loại điểm theo việc nghe nhạc</div>
            <div className="chart-container">
                <div className="chart">
                    <div ref={pieChartRef1} className="chart-title">Không nghe nhạc</div>
                </div>
                <div className="chart">
                    <div ref={pieChartRef2} className="chart-title">Có nghe nhạc</div>
                </div>
            </div>
            <div className="legend">
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#ff7f0e' }}></div>
                    Grade 0
                </div>
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#1f77b4' }}></div>
                    Grade 1
                </div>
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#2ca02c' }}></div>
                    Grade 2
                </div>
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#d62728' }}></div>
                    Grade 3
                </div>
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#9467bd' }}></div>
                    Grade 4
                </div>
            </div>
        </div>
    );
};

export default PieChart;
