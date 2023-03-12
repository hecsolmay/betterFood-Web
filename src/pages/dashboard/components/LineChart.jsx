import { Chart as ChartJS } from "chart.js/auto";
import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ chartData }) => {
  console.log(chartData);
  return <Line data={chartData}></Line>;
};

export default LineChart;
