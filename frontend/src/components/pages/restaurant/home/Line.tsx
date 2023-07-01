import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line as ChartLine } from "react-chartjs-2";
import { useTheme } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  lineTension: 0.1,
  plugins: {
    legend: {
      display: true,
      position: "bottom" as const,
    },
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type IProps = {
  data1: any;
  data2: any;
};

const Line: React.FC<IProps> = ({ data1, data2 }) => {
  const theme = useTheme();

  const data = {
    labels,
    datasets: [
      {
        label: "Done",
        data: data1,
        borderColor: theme.palette.primary.main,
      },
      {
        label: "Cancelled",
        data: data2,
        borderColor: theme.palette.secondary.main,
      },
    ],
  };

  return <ChartLine options={options} data={data} />;
};

export default Line;
