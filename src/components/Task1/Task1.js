import React from "react";
import * as d3 from "d3";
import Chart from "./Chart";
import "./Task1.css";

const Task1 = () => {
  React.useEffect(() => {
    if (document.getElementById("chart_task1").innerHTML === "") {
      d3.select("#chart_task1").append(() => Chart.svg_chart);
      d3.select("#chart_task1").append(() => Chart.svg_legend);
    }
  }, []);
  return (
    <div className="content">
      <div>
        <h2>Task 1: Yếu tố Học thêm (có hoặc không) có ảnh hưởng thế nào đến Xếp loại của học sinh (A, B, C, D, F)</h2>
      </div>
      <div id="chart_task1"></div>
    </div>
  );
};

export default Task1;
