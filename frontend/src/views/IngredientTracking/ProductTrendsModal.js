import React, { useState } from "react";
import { Line } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProductTrendsModal = ({ product, onClose }) => {
  const [timePeriod, setTimePeriod] = useState("1 year");

  // Mock data; you would replace this with data fetched based on the selected time period
  const data = {
    labels:
      timePeriod === "3 months"
        ? ["Jan", "Feb", "Mar"]
        : [
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
          ],
    datasets: [
      {
        label: "Price ($)",
        yAxisID: "y",
        data: [12, 19, 3, 5, 2, 3, 12, 14, 10, 5, 2, 8], // Mock price data
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Sales ($)",
        yAxisID: "y1",
        data: [20, 30, 45, 50, 20, 30, 45, 50, 20, 30, 45, 50], // Mock sales data
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  return (
    <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-10">
      {" "}
      {/* Changed from fixed to absolute */}
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-xl max-w-4xl w-full mx-4 my-4 sm:mx-6 md:mx-8">
        <h2 className="text-lg font-bold">{product.name} - Sales Trends</h2>
        <select
          value={timePeriod}
          onChange={handleTimePeriodChange}
          className="mt-2 p-2 border rounded w-full"
        >
          <option value="3 months">Last 3 Months</option>
          <option value="6 months">Last 6 Months</option>
          <option value="1 year">Last 1 Year</option>
          <option value="5 years">Last 5 Years</option>
        </select>
        <div className="mt-4">
          <Line data={data} options={options} />
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductTrendsModal;
