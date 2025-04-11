import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import useToggle from "../../../hooks/useToggle";

const DoughnutChart = () => {
  return (
    <Doughnut
      data={{
        labels: ["Dine-In", "Takeaway", "Delivery"],
        datasets: [
          {
            label: "Order Distribution",
            data: [30, 45, 25],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      }}
      height={400}
      width={600}
      options={{
        maintainAspectRatio: false,
      }}
    />
  );
};

const MonthlyLineChart = () => {
  return (
    <Line
      data={{
        labels: [1, 5, 10, 15, 20, 25, 30],
        datasets: [
          {
            label: "Daily Orders This Month",
            data: [80, 90, 75, 85, 95, 100, 110],
            fill: false,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
          },
        ],
      }}
      height={400}
      width={600}
      options={{
        maintainAspectRatio: false,
      }}
    />
  );
};

const YearlyBarChart = () => {
  return (
    <Bar
      data={{
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Monthly Orders This Year",
            data: [120, 150, 180, 200, 170, 190, 220, 210, 230, 240, 250, 260],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      }}
      height={400}
      width={600}
      options={{
        maintainAspectRatio: false,
      }}
    />
  );
};

export default function Charts() {
  const [isToggled, toggle] = useToggle(false);

  return (
    <>
      <div className="pt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
        <div className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
          <DoughnutChart />
        </div>
        <div
          className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6 col-span-2"
          onClick={toggle}
        >
          {isToggled ? <YearlyBarChart /> : <MonthlyLineChart />}
        </div>
      </div>
    </>
  );
}
