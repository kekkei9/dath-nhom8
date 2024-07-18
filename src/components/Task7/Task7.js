import React from "react";
import * as d3 from "d3";
import Chart from "./Chart";
import "./Task7.css";

const Task7 = () => {
  React.useEffect(() => {
    if (document.getElementById("chart_task7").innerHTML === "") {
      d3.select("#chart_task7").append(() => Chart.svg_chart);
    }
  }, []);
  return (
    <div className="content">
      <div>
        <h2>Task 7: Số buổi vắng mặt có ảnh hưởng đến GPA hay không?</h2>
      </div>
      <div id="chart_task7"></div>
    </div>
  );
};

export default Task7;
