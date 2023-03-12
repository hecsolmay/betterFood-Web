import { Chart as ChartJS } from "chart.js/auto";
import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ chartData }) => {
  console.log(chartData);
  return <Bar data={chartData}></Bar>;
};

export default BarChart;
