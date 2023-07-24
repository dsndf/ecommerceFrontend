import React from "react";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, //x-axis
  LinearScale, // y-axis
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./LineChart.css";
ChartJS.register(
  LineElement,
  CategoryScale,
  Legend,
  Tooltip,
  LinearScale,
  PointElement
);

const LineChart = ({income}) => {

  return (
    <div className="line-chart">
      <Line
        data={{
          labels: ["Initial Amount", "Amount Earned"],
          datasets: [
            {
              label: "Total Amount",
              data: [0,income],
              backgroundColor: "#00a0e5",
              borderColor: "#00a0e5",
              pointBorderColor: "green",
              hoverBackgroundColor:"blue",
              hoverBorderColor:"green",
              
              fill: true,
              tension: 0.4,
            },
          ],
        }}
        options={{
          plugins: {
            legend: true,
          },
          scales: {
            y: {
              min: 0,
              max: 100000,
            },
          },
        }}
      ></Line>
    </div>
  );
};

export default LineChart;
