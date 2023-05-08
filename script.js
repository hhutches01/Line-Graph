const chartData2023 = [
  { name: "Facebook", users: 2950000000 },
  { name: "Instagram", users: 2320000000 },
  { name: "TikTok", users: 1500000000 },
  { name: "Snapchat", users: 900000000 },
  { name: "LinkedIn", users: 300000000 },
];

const chartData2018 = [
  { name: "Facebook", users: 2250000000 },
  { name: "Instagram", users: 1000000000 },
  { name: "Snapchat", users: 300000000 },
  { name: "LinkedIn", users: 260000000 },
  { name: "Twitter", users: 330000000 },
];

let currentYear = 2023;
let chartData = chartData2023;

const svgWidth = 600;
const svgHeight = 600;
const barWidth = 50;
const barPadding = 10;
const axisPadding = 50;

const chart = document.getElementById("chart");
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", svgWidth);
svg.setAttribute("height", svgHeight);
chart.appendChild(svg);

function drawChart() {
  while (svg.firstChild) {
    svg.removeChild(svg.firstChild);
  }

  chartData.sort((a, b) => b.users - a.users);

  const barSpacing = (svgWidth - 2 * axisPadding) / chartData.length;

  chartData.forEach((d, i) => {
    const bar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    const barHeight = (d.users / chartData[0].users) * (svgHeight - 2 * axisPadding);
    const x = axisPadding + i * barSpacing;
    const y = svgHeight - axisPadding - barHeight;

    bar.setAttribute("x", x);
    bar.setAttribute("y", y);
    bar.setAttribute("width", barWidth);
    bar.setAttribute("height", barHeight);
    bar.setAttribute("fill", "#69b3a2");
    svg.appendChild(bar);

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.textContent = d.name;
    label.setAttribute("x", x + barWidth / 2);
    label.setAttribute("y", svgHeight - axisPadding + 15);
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("font-size", "12px");
    svg.appendChild(label);
  });

  const title = document.createElementNS("http://www.w3.org/2000/svg", "text");
  title.textContent = `Top 5 Social Media Platforms by Active Users ${currentYear}`;
  title.setAttribute("x", svgWidth / 2);
  title.setAttribute("y", axisPadding / 2);
    title.setAttribute("text-anchor", "middle");
  title.setAttribute("font-size", "24px");
  title.setAttribute("font-weight", "bold");
  svg.appendChild(title);

  const maxValue = chartData[0].users;
  const tickInterval = 500000000;
  const yAxisTicks = maxValue / tickInterval;
  const tickWidth = 5;
  const tickTextPadding = 3;

  for (let i = 0; i <= yAxisTicks; i++) {
    const yValue = tickInterval * i;
    const yPos = svgHeight - axisPadding - (yValue / maxValue) * (svgHeight - 2 * axisPadding);

    const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
    tick.setAttribute("x1", axisPadding - tickWidth / 2);
    tick.setAttribute("y1", yPos);
    tick.setAttribute("x2", axisPadding + tickWidth / 2);
    tick.setAttribute("y2", yPos);
    tick.setAttribute("stroke", "black");
    svg.appendChild(tick);

    const tickLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    tickLabel.textContent = yValue / 1000000 + "M";
    tickLabel.setAttribute("x", axisPadding - tickWidth / 2 - tickTextPadding);
    tickLabel.setAttribute("y", yPos);
    tickLabel.setAttribute("text-anchor", "end");
    tickLabel.setAttribute("dominant-baseline", "middle");
    tickLabel.setAttribute("font-size", "12px");
    svg.appendChild(tickLabel);
  }

  const xAxisLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
  xAxisLine.setAttribute("x1", axisPadding);
  xAxisLine.setAttribute("y1", svgHeight - axisPadding);
  xAxisLine.setAttribute("x2", svgWidth - axisPadding);
  xAxisLine.setAttribute("y2", svgHeight - axisPadding);
  xAxisLine.setAttribute("stroke", "black");
  svg.appendChild(xAxisLine);
}

drawChart();

const toggleButton = document.getElementById("toggleButton");
toggleButton.addEventListener("click", () => {
  if (currentYear === 2023) {
    currentYear = 2018;
    chartData = chartData2018;
  } else {
    currentYear = 2023;
    chartData = chartData2023;
  }

  drawChart();
});



