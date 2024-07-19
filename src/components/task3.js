import React from 'react';
import BarChart from './BarChart';
import './task3.css';

const App = () => {
    const data = [
        { category: '15', listen_music: 0, count: 1.898508725 },
        { category: '16', listen_music: 0, count: 1.907533862 },
        { category: '17', listen_music: 0, count: 1.927029966 },
        { category: '18', listen_music: 0, count: 1.892101322 },
    ];

    return (
        <div className="chart-container">
            <BarChart data={data} listenMusic={0} title="GPA trung bình theo độ tuổi" />
        </div>
    );
};

export default App;

