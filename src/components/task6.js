import React, { useEffect } from 'react';
import * as d3 from 'd3';
import './task6.css';

const StackedBarChart = () => {
    useEffect(() => {
        // Dữ liệu mẫu
        const data = [
            { group: 'Không nghe nhạc', grade0: 86, grade1: 199, grade2: 318, grade3: 333, grade4: 985 },
            { group: 'Nghe nhạc', grade0: 21, grade1: 70, grade2: 73, grade3: 81, grade4: 226 }
        ];

        // Chuyển đổi dữ liệu để tính tỷ lệ phần trăm
        data.forEach(d => {
            const total = d.grade0 + d.grade1 + d.grade2 + d.grade3 + d.grade4;
            d.grade0 = (d.grade0 / total) * 100;
            d.grade1 = (d.grade1 / total) * 100;
            d.grade2 = (d.grade2 / total) * 100;
            d.grade3 = (d.grade3 / total) * 100;
            d.grade4 = (d.grade4 / total) * 100;
        });

        const svgWidth = 600;
        const svgHeight = 400;
        const margin = { top: 50, right: 30, bottom: 80, left: 50 };

        const width = svgWidth - margin.left - margin.right;
        const height = svgHeight - margin.top - margin.bottom;

        const svg = d3.select('#stacked-bar-chart')
            .attr('width', svgWidth)
            .attr('height', svgHeight);

        svg.selectAll('*').remove(); // Xóa nội dung cũ nếu có

        svg.append('text')
            .attr('class', 'title')
            .attr('x', svgWidth / 2)
            .attr('y', margin.top / 2)
            .text('Tỷ lệ phần trăm điểm số theo nhóm');

        const chart = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        const x = d3.scaleBand()
            .domain(data.map(d => d.group))
            .range([0, width])
            .padding(0.7);

        const y = d3.scaleLinear()
            .domain([0, 100])
            .nice()
            .range([height, 0]);

        chart.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .selectAll('text')
            .attr('class', 'axis-label');

        chart.append('g')
            .call(d3.axisLeft(y).ticks(5).tickFormat(d => d + '%'))
            .selectAll('text')
            .attr('class', 'axis-label');

        const color = d3.scaleOrdinal()
            .domain(['grade0', 'grade1', 'grade2', 'grade3', 'grade4'])
            .range(['#ff7f0e', '#1f77b4', '#2ca02c', '#d62728', '#9467bd']);

        const stack = d3.stack()
            .keys(['grade0', 'grade1', 'grade2', 'grade3', 'grade4']);

        const series = stack(data);

        chart.selectAll('.serie')
            .data(series)
            .enter()
            .append('g')
            .attr('class', 'serie')
            .attr('fill', d => color(d.key))
            .selectAll('rect')
            .data(d => d)
            .enter()
            .append('rect')
            .attr('x', d => x(d.data.group))
            .attr('y', d => y(d[1]))
            .attr('height', d => y(d[0]) - y(d[1]))
            .attr('width', x.bandwidth());

        const legend = d3.select('#legend');

        ['grade0', 'grade1', 'grade2', 'grade3', 'grade4'].forEach((key, i) => {
            const legendItem = legend.append('div')
                .attr('class', 'legend-item');

            legendItem.append('span')
                .attr('class', 'color-box')
                .style('background-color', color(key));

            legendItem.append('span')
                .attr('class', 'label')
                .text(key);
        });

    }, []);

    return (
        <div id="chart-container">
            <svg id="stacked-bar-chart"></svg>
            <div className="legend" id="legend"></div>
            <div className="text-info">
                <p>Không nghe nhạc: Grade 0: 4.48%; Grade 1: 10.36%; Grade 2: 16.55%; Grade 3: 17.33%; Grade 4: 51.28%</p>
                <p>Có nghe nhạc: Grade 0: 4.46%; Grade 1: 14.86%; Grade 2: 15.50%; Grade 3: 17.20%; Grade 4: 47.98%</p>
            </div>
        </div>
    );
};

export default StackedBarChart;
