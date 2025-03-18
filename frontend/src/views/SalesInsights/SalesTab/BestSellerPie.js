import React from "react";
import { PolarArea } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Make sure Chart.js components are auto-registered

const data = {
  labels: [
    "Margherita Pizza",
    "Pepperoni Pizza",
    "Caesar Salad",
    "Cheeseburger",
    "Pasta Alfredo",
  ],
  datasets: [
    {
      label: "# of Orders",
      data: [25, 30, 15, 20, 10],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(201, 203, 207, 0.2)",
        "rgba(54, 162, 235, 0.2)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(75, 192, 192)",
        "rgb(255, 205, 86)",
        "rgb(201, 203, 207)",
        "rgb(54, 162, 235)",
      ],
      borderWidth: 1,
    },
  ],
};

export default function BestSellerPie() {
  return (
    <div className="pt-5 h-screen">
      <dl className="h-2/3 mt-5 grid justify-items-center grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-1 md:divide-x md:divide-y-0">
        <PolarArea data={data} />
      </dl>
    </div>
  );
}
