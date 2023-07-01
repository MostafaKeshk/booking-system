import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut as ChartDoughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const labels = ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"];

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom" as const,
    },
  },
  cutout: 120,
};

type IProps = {
  chartData: any;
};

const Doughnut: React.FC<IProps> = ({ chartData }) => {
  const data = {
    labels,
    datasets: [
      {
        data: chartData,
        backgroundColor: [
          "#007BFF",
          "#8A2BE2",
          "#28A745",
          "#FFC107",
          "#DC3545",
        ],
      },
    ],
  };

  return <ChartDoughnut options={options} data={data} />;
};

export default Doughnut;
