import React from 'react';
import BarChart from './SportBarChart';
import './task5.css';

const App = () => {
    const data = [
        { category: 'Chơi', listen_music: 0, count: 1.986380882 },
        { category: 'Không chơi', listen_music: 0, count: 1.871239565 },
    ];

    return (
        <div className="chart-container">
            <BarChart data={data} listenMusic={0} title="GPA trung bình của người chơi thể thao và không chơi" />
        </div>
    );
};

export default App;

