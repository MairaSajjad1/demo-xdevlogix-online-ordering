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
import { FC } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
  },
};

interface ChartProps {
  heading: string;
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      lineTension: number;
      borderColor: string;
    }[];
  };
}

const Chart: FC<ChartProps> = ({ heading, data }) => {
  return (
    <div className="bg-[#FFFFFF] rounded-2xl">
      <h1 className="p-4 border-b text-[#343239] border-[#f5f5f5] font-semibold text-xl">
        {heading}
      </h1>
      <div className="w-full h-96 p-4">
        <Line height={"100%"} options={options} data={data} />
      </div>
    </div>
  );
};

export default Chart;
