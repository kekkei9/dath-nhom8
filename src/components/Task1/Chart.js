import * as d3 from "d3";
import dataSource from "../../Dataset/Student_performance_data _.csv";

const rawData = await d3.csv(dataSource);

const data = [];
data.push({
  Tutoring: "1",
  GradeClass: "0.0",
  numberStudent: 0,
});
data.push({
  Tutoring: "0",
  GradeClass: "0.0",
  numberStudent: 0,
});
data.push({
  Tutoring: "1",
  GradeClass: "1.0",
  numberStudent: 0,
});
data.push({
  Tutoring: "0",
  GradeClass: "1.0",
  numberStudent: 0,
});
data.push({
  Tutoring: "1",
  GradeClass: "2.0",
  numberStudent: 0,
});
data.push({
  Tutoring: "0",
  GradeClass: "2.0",
  numberStudent: 0,
});
data.push({
  Tutoring: "1",
  GradeClass: "3.0",
  numberStudent: 0,
});
data.push({
  Tutoring: "0",
  GradeClass: "3.0",
  numberStudent: 0,
});
data.push({
  Tutoring: "1",
  GradeClass: "4.0",
  numberStudent: 0,
});
data.push({
  Tutoring: "0",
  GradeClass: "4.0",
  numberStudent: 0,
});
for (const item of rawData) {
  const existingItem = data.find((r) => {
    return r.Tutoring === item.Tutoring && r.GradeClass === item.GradeClass;
  });

  if (existingItem) {
    // Nếu đã có đối tượng tương ứng, tăng số lượng học sinh lên 1
    existingItem.numberStudent++;
  } else {
    // Nếu chưa có, tạo đối tượng mới và thêm vào mảng
    data.push({
      Tutoring: item.Tutoring,
      GradeClass: item.GradeClass,
      numberStudent: 1,
    });
  }
}

// Specify the chart’s dimensions (except for the height).
const width = 800;
const marginTop = 70;
const marginRight = 10;
const marginBottom = 45;
const marginLeft = 50;

// Determine the series that need to be stacked.
const series = d3
  .stack()
  .keys(d3.union(data.map((d) => d.GradeClass))) // distinct series keys, in input order
  .value(([, D], key) => D.get(key).numberStudent) // get value for each series key and stack
  .offset(d3.stackOffsetExpand)(
  d3.index(
    data,
    (d) => d.Tutoring,
    (d) => d.GradeClass
  )
); // group by stack then series key

// Compute the height from the number of stacks.
const height = series[0].length * 40 + marginTop + marginBottom;

// Prepare the scales for positional and color encodings.
const x = d3
  .scaleLinear()
  .domain([0, d3.max(series, (d) => d3.max(d, (d) => d[1]))])
  .range([marginLeft, width - marginRight]);

const y = d3
  .scaleBand()
  .domain(
    d3.groupSort(
      data,
      (D) =>
        -D.find((d) => d.GradeClass === "2.0").numberStudent /
        d3.sum(D, (d) => d.numberStudent),
      (d) => d.Tutoring
    )
  )
  .range([marginTop, height - marginBottom])
  .padding(0.08);

const color = d3
  .scaleOrdinal()
  .domain(series.map((d) => d.key))
  .range(d3.schemeSpectral[series.length])
  .unknown("#ccc");

// A function to format the value in the tooltip.
const formatValue = (x) => (isNaN(x) ? "N/A" : x.toLocaleString("en"));

// Create the SVG container.
const svg_chart = d3
  .create("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [0, 0, width, height])
  .attr("style", "max-width: 100%; height: auto;");

// Append a group for each series, and a rect for each element in the series.
svg_chart
  .append("g")
  .selectAll()
  .data(series)
  .join("g")
  .attr("fill", (d) => color(d.key))
  .selectAll("rect")
  .data((D) =>
    D.map((d) => {
      d.key = D.key;
      return d;
    })
  )
  .join("rect")
  .attr("x", (d) => x(d[0]))
  .attr("y", (d) => y(d.data[0]))
  .attr("height", y.bandwidth())
  .attr("width", (d) => x(d[1]) - x(d[0]))
  .append("title")
  .text(
    (d) =>
      `${d.data[0]} ${d.key}\n${formatValue(
        d.data[1].get(d.key).numberStudent
      )}`
  );

// Append the horizontal axis.
svg_chart
  .append("g")
  .attr("transform", `translate(0,${marginTop})`)
  .call(d3.axisTop(x).ticks(width / 100, "%"))
  .call((g) => g.selectAll(".domain").remove());

// Append the vertical axis.
svg_chart
  .append("g")
  .attr("transform", `translate(${marginLeft},0)`)
  .call(d3.axisLeft(y).tickSizeOuter(0))
  .call((g) => g.selectAll(".domain").remove());

// X label
svg_chart
  .append("text")
  .attr("x", width - 160)
  .attr("y", 30)
  .attr("text-anchor", "middle")
  .style("font-family", "Helvetica")
  .style("font-size", 14)
  .text('% Số học sinh theo "Xếp loại" và "Học thêm"');

// Y label
svg_chart
  .append("text")
  .attr("text-anchor", "middle")
  .attr("transform", "translate(20," + 100 + ")rotate(-90)")
  .style("font-family", "Helvetica")
  .style("font-size", 14)
  .text("Học thêm (1: Có, 0: Không)");

// Create the SVG legend container.
const svg_legend = d3
  .create("svg")
  .attr("width", 800)
  .attr("height", 70)
  .attr("viewBox", [0, 0, 800, 20])
  .attr("style", "max-width: 100%; height: auto;")
  .attr("transform", `translate(${marginLeft}, 0)`); // Move the legend below the chart

// Append a group for each series in the legend.
const legend = svg_legend
  .append("g")
  .selectAll("g")
  .data(series)
  .join("g")
  .attr("transform", (d, i) => `translate(${i * 70 + 20}, 0)`);

legend
  .append("rect")
  .attr("width", 19)
  .attr("height", 19)
  .attr("fill", (d) => color(d.key));

legend
  .append("text")
  .attr("x", 24)
  .attr("y", 9.5)
  .attr("dy", "0.35em")
  .text((d) => {
    const gradeClass = d.key;
    if (gradeClass === "0.0") return "A";
    if (gradeClass === "1.0") return "B";
    if (gradeClass === "2.0") return "C";
    if (gradeClass === "3.0") return "D";
    if (gradeClass === "4.0") return "F";
    return gradeClass;
  });

  // Append the Xếp loại label under the legend.
  svg_legend
    .append("text")
    .attr("x", 170)
    .attr("y", -12)
    .attr("text-anchor", "middle")
    .style("font-family", "Helvetica")
    .style("font-size", 14)
    .text("Xếp loại");

// Return the SVG elements.
const Chart = {
  svg_chart: svg_chart.node(),
  svg_legend: svg_legend.node(),
};
export default Chart;
