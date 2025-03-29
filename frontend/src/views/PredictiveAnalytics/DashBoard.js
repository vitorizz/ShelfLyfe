// Dashboard.js
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ShoppingCartIcon,
  FireIcon,
  ChartBarIcon,
} from "@heroicons/react/20/solid";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Orders",
        data: [400, 450, 500, 600, 650, 700, 750],
        backgroundColor: "#2563EB", // blue-600
      },
      {
        label: "Meals",
        data: [300, 350, 420, 480, 540, 600, 650],
        backgroundColor: "#FBBF24", // yellow-400
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "bottom" } },
    scales: {
      x: { grid: { display: false } },
      y: { ticks: { stepSize: 100 } },
    },
  };

  const topMeals = [
    { name: "Grilled Salmon", orders: 245, direction: "up" },
    { name: "Chicken Parmesan", orders: 198, direction: "up" },
    { name: "Caesar Salad", orders: 156, direction: "down" },
    { name: "Beef Burger", orders: 142, direction: "down" },
    { name: "Vegetable Pasta", orders: 118, direction: "up" },
  ];

  const KPIData = [
    {
      title: "Projected Orders (Next Month)",
      value: "2,350",
      icon: ShoppingCartIcon,
      change: "+12% from last month",
      changeType: "up",
    },
    {
      title: "Most Popular Meal",
      value: "Grilled Salmon",
      icon: FireIcon,
      change: "+245 orders placed",
      changeType: "up",
    },
    {
      title: "Average Daily Orders",
      value: "78",
      icon: ChartBarIcon,
      change: "+5% from last month",
      changeType: "up",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Header & View Selector */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Predictive Analytics Dashboard
          </h1>
          <select className="border border-gray-300 rounded-md px-5 pr-8 py-2 text-sm text-gray-700">
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Daily</option>
          </select>
        </div>

        {/* Tabs */}
        <div className="flex space-x-8 border-b border-gray-200 mb-8">
          <button className="pb-2 text-lg font-medium text-gray-900 border-b-2 border-blue-600">
            Orders & Meals
          </button>
          <button className="pb-2 text-lg font-medium text-gray-500 hover:text-gray-700">
            Waste Reduction
          </button>
          <button className="pb-2 text-lg font-medium text-gray-500 hover:text-gray-700">
            Earnings
          </button>
          <button className="pb-2 text-lg font-medium text-gray-500 hover:text-gray-700">
            Ingredient Demand
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {KPIData.map((kpi, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-lg bg-white border border-gray-200 px-6 py-5 shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-gray-500">{kpi.title}</div>
                  <div className="mt-1 text-2xl font-bold text-gray-900">
                    {kpi.value}
                  </div>
                  <div
                    className={`mt-1 flex items-center text-sm ${
                      kpi.changeType === "up"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {kpi.changeType === "up" ? (
                      <ArrowUpIcon className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 mr-1" />
                    )}
                    {kpi.change}
                  </div>
                </div>
                <kpi.icon className="h-8 w-8 text-gray-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Chart and Top Meals */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Card */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-lg bg-white border border-gray-200 px-6 py-5 shadow">
            <div className="mb-4 text-lg font-semibold text-gray-900">
              Orders & Meals Forecast
            </div>
            <div className="h-80">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>

          {/* Top Meals List */}
          <div className="relative overflow-hidden rounded-lg bg-white border border-gray-200 px-6 py-5 shadow">
            <div className="mb-1 text-lg font-semibold text-gray-900">
              Top Meals
            </div>
            <p className="mb-4 text-sm text-gray-500">
              Most popular meals by order volume
            </p>
            <ul className="divide-y divide-gray-100">
              {topMeals.map((meal, idx) => (
                <li
                  key={idx}
                  className="py-3 flex justify-between items-center"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">
                      {meal.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {meal.orders} orders
                    </span>
                  </div>
                  {meal.direction === "up" ? (
                    <ArrowUpIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <ArrowDownIcon className="h-5 w-5 text-red-500" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
