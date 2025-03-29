// Dashboard.js
import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
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
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("orders");

  // Bar Chart for projected orders over next 6 months
  const barData = {
    labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Orders",
        data: [400, 450, 500, 600, 650, 700],
        backgroundColor: "#2563EB", // blue-600
      },
      {
        label: "Meals",
        data: [300, 350, 420, 480, 540, 600],
        backgroundColor: "#FBBF24", // yellow-400
      },
    ],
  };

  const barDataOrders = {
    labels: ["April", "May", "June", "July", "August", "September"],
    datasets: [
      {
        label: "Orders",
        data: [500, 600, 550, 700, 650, 720], // example values for this year
        backgroundColor: "#2563EB", // blue-600
      },
      {
        label: "Orders Last Year",
        data: [450, 580, 530, 680, 640, 700], // example values for last year
        backgroundColor: "#10B981", // green-500
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

  // Data for line charts by dish category
  const lineChartDataByCategory = {
    Appetizers: {
      labels: ["April", "May", "June", "July", "August", "September"],
      datasets: [
        {
          label: "Spring Rolls",
          data: [50, 60, 55, 70, 65, 75],
          fill: false,
          borderColor: "#2563EB",
          tension: 0.1,
        },
        {
          label: "Garlic Bread",
          data: [40, 45, 50, 55, 60, 65],
          fill: false,
          borderColor: "#FBBF24",
          tension: 0.1,
        },
      ],
    },
    Mains: {
      labels: ["April", "May", "June", "July", "August", "September"],
      datasets: [
        {
          label: "Grilled Salmon",
          data: [70, 75, 80, 85, 90, 95],
          fill: false,
          borderColor: "#10B981",
          tension: 0.1,
        },
        {
          label: "Steak",
          data: [65, 70, 68, 75, 80, 85],
          fill: false,
          borderColor: "#EF4444",
          tension: 0.1,
        },
        {
          label: "Pasta",
          data: [60, 65, 70, 72, 75, 80],
          fill: false,
          borderColor: "#3B82F6",
          tension: 0.1,
        },
      ],
    },
    Desserts: {
      labels: ["April", "May", "June", "July", "August", "September"],
      datasets: [
        {
          label: "Cheesecake",
          data: [30, 35, 33, 40, 38, 42],
          fill: false,
          borderColor: "#8B5CF6",
          tension: 0.1,
        },
        {
          label: "Brownie",
          data: [25, 28, 30, 32, 35, 37],
          fill: false,
          borderColor: "#F59E0B",
          tension: 0.1,
        },
      ],
    },
  };

  const [selectedCategory, setSelectedCategory] = useState("Appetizers");
  const lineChartData = lineChartDataByCategory[selectedCategory];
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "bottom" } },
    scales: { x: { grid: { display: false } } },
  };

  // KPI Cards data
  const KPIData = [
    {
      title: "Projected Orders (Next 6 Months)",
      value: "2,350",
      icon: ShoppingCartIcon,
      change: "+12% from last month",
      changeType: "up",
    },
    {
      title: "Projected Most Popular Meal",
      value: "Grilled Salmon",
      icon: FireIcon,
      change: "+245 orders to be placed",
      changeType: "up",
    },
    {
      title: "Projected Average Daily Orders",
      value: "78",
      icon: ChartBarIcon,
      change: "+13% from last 6 months",
      changeType: "up",
    },
  ];

  // Top Meals data for the list
  const topMeals = [
    { name: "Grilled Salmon", orders: 245, direction: "up" },
    { name: "Chicken Parmesan", orders: 198, direction: "up" },
    { name: "Caesar Salad", orders: 156, direction: "down" },
    { name: "Beef Burger", orders: 142, direction: "down" },
    { name: "Vegetable Pasta", orders: 118, direction: "up" },
  ];

  return (
    <div className=" bg-white">
      {/* Main Content */}
      <main className="max-w mx-auto p-6 space-y-10">
        {/* Header with Subtitle */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Predictive Analytics Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Projected orders and dishes for the next 6 months
            </p>
          </div>
          {/* <select className="border border-gray-300 rounded-md px-3 pr-8 py-2 text-sm text-gray-700">
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Daily</option>
          </select> */}
        </div>

        {/* Tabs */}
        <div className="flex space-x-8 border-b border-gray-200 mb-8">
          <button className="pb-2 text-lg font-medium text-gray-900 border-b-2 border-blue-600">
            Orders & Dishes
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        {/* Side-by-Side: Dish Performance and Top Meals */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tabbed charts spanning 2 columns on large screens */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex space-x-8 border-b border-gray-200 mb-8">
              <button
                onClick={() => setActiveTab("orders")}
                className={`pb-2 text-lg font-medium ${
                  activeTab === "orders"
                    ? "text-gray-900 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Projected Orders for the Next 6 Months
              </button>
              <button
                onClick={() => setActiveTab("dishPerformance")}
                className={`pb-2 text-lg font-medium ${
                  activeTab === "dishPerformance"
                    ? "text-gray-900 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Projected Dish Performance by Category
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "orders" && (
              <div className="relative overflow-hidden rounded-lg bg-white border border-gray-200 px-6 py-5 shadow-lg">
                <div className="mb-2">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Projected Orders for the Next 6 Months
                  </h2>
                  <p className="text-sm text-gray-500">
                    Projected next 6 months of orders with last year's
                    comparison
                  </p>
                </div>
                <div className="h-80 mt-4">
                  <Bar data={barDataOrders} options={barOptions} />
                </div>
              </div>
            )}

            {activeTab === "dishPerformance" && (
              <div className="relative overflow-hidden rounded-lg bg-white border border-gray-200 px-6 py-5 shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-lg font-semibold text-gray-900">
                    Projected Dish Performance by Category
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 pr-7 py-2 text-sm text-gray-700"
                  >
                    <option value="Appetizers">Appetizers</option>
                    <option value="Mains">Mains</option>
                    <option value="Desserts">Desserts</option>
                  </select>
                </div>
                <div className="h-80">
                  <Line data={lineChartData} options={lineChartOptions} />
                </div>
              </div>
            )}
          </div>

          {/* Top Meals Section in the third column */}
          <div className="relative overflow-hidden rounded-lg bg-white border border-gray-200 px-6 py-5 shadow">
            <div className="mb-1 text-lg font-semibold text-gray-900">
              Projected Top Dishes
            </div>
            <p className="mb-4 text-sm text-gray-500">
              Most popular dishes by order volume
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
