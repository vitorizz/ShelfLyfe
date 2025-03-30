// IngredientDemand.js
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
  ExclamationCircleIcon,
  ShoppingCartIcon,
  BanknotesIcon,
} from "@heroicons/react/20/solid";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function IngredientDemand() {
  // KPI Data
  const kpiData = [
    {
      title: "Top Ingredient in Demand",
      value: "Tomatoes",
      change: "+10% from last month",
      changeType: "up",
      icon: ShoppingCartIcon, // unique icon for this card
    },
    {
      title: "Ingredients at Risk of Shortage",
      value: "4",
      change: "+1 more than last week",
      changeType: "up",
      icon: ExclamationCircleIcon, // unique icon for this card
    },
    {
      title: "Potential Savings",
      value: "$350",
      change: "With optimized ordering",
      changeType: "up",
      icon: BanknotesIcon, // unique icon for this card
    },
  ];

  // Bar Chart Data (Horizontal)
  const barData = {
    labels: ["Tomatoes", "Chicken", "Lettuce", "Onions", "Cheese"],
    datasets: [
      {
        label: "Projected Usage",
        data: [120, 110, 80, 65, 60],
        backgroundColor: "#000000",
      },
      {
        label: "Current Stock",
        data: [100, 90, 70, 60, 50],
        backgroundColor: "#9CA3AF", // gray-400
      },
    ],
  };

  const barOptions = {
    indexAxis: "y", // horizontal bar
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    scales: {
      x: {
        grid: { display: false },
        beginAtZero: true,
        ticks: {
          stepSize: 20,
        },
      },
      y: {
        grid: { display: false },
      },
    },
  };

  // Ingredient Demand Forecast Table Data
  const forecastData = [
    {
      ingredient: "Tomatoes",
      demand: "120 kg",
      stock: "80 kg",
      shortfall: "40 kg",
      status: "Reorder",
    },
    {
      ingredient: "Chicken",
      demand: "100 kg",
      stock: "90 kg",
      shortfall: "10 kg",
      status: "Reorder",
    },
    {
      ingredient: "Lettuce",
      demand: "85 kg",
      stock: "85 kg",
      shortfall: "0 kg",
      status: "Sufficient",
    },
    {
      ingredient: "Onions",
      demand: "60 kg",
      stock: "60 kg",
      shortfall: "0 kg",
      status: "Sufficient",
    },
    {
      ingredient: "Cheese",
      demand: "50 kg",
      stock: "40 kg",
      shortfall: "10 kg",
      status: "Reorder",
    },
    {
      ingredient: "Rice",
      demand: "60 kg",
      stock: "60 kg",
      shortfall: "0 kg",
      status: "Sufficient",
    },
  ];

  // Seasonal & Weekly Trends Data
  const trends = [
    {
      title: "Summer Trends",
      description:
        "Citrus fruit, fresh herbs, and seafood usage spikes in summer months. Consider increasing stock by 5-20%.",
    },
    {
      title: "Weekend Patterns",
      description:
        "Premium ingredients like steak and seafood see 30% higher usage on weekends. Adjust ordering schedule accordingly.",
    },
  ];

  return (
    <div className="bg-white text-gray-800">
      <main className="max-w mx-auto px-4 py-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpiData.map((kpi, idx) => (
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
                      kpi.change === "+1 more than last week"
                        ? "text-red-600"
                        : kpi.changeType === "up"
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
                {/* Unique icon for each KPI */}
                <kpi.icon className="h-6 w-6 text-gray-200" />
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid: Bar Chart & Forecast Table */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Ingredient Demand Forecast
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Detailed breakdown with potential shortfalls
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="pb-2 font-medium">Ingredient</th>
                  <th className="pb-2 font-medium">Demand</th>
                  <th className="pb-2 font-medium">Stock</th>
                  <th className="pb-2 font-medium">Shortfall</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* 1: Tomatoes */}
                <tr className="border-b border-gray-200 last:border-0">
                  <td className="py-2 pr-4 font-semibold text-gray-900">
                    Tomatoes
                  </td>
                  <td className="py-2 pr-4">120 kg</td>
                  <td className="py-2 pr-4">80 kg</td>
                  <td className="py-2 pr-4">40 kg</td>
                  <td className="py-2 pr-4">
                    <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-full">
                      Reorder
                    </span>
                  </td>
                </tr>

                {/* 2: Chicken */}
                <tr className="border-b border-gray-200 last:border-0">
                  <td className="py-2 pr-4 font-semibold text-gray-900">
                    Chicken
                  </td>
                  <td className="py-2 pr-4">95 kg</td>
                  <td className="py-2 pr-4">100 kg</td>
                  <td className="py-2 pr-4">0 kg</td>
                  <td className="py-2 pr-4">
                    <span className="inline-block px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
                      Sufficient
                    </span>
                  </td>
                </tr>

                {/* 3: Lettuce */}
                <tr className="border-b border-gray-200 last:border-0">
                  <td className="py-2 pr-4 font-semibold text-gray-900">
                    Lettuce
                  </td>
                  <td className="py-2 pr-4">85 kg</td>
                  <td className="py-2 pr-4">60 kg</td>
                  <td className="py-2 pr-4">25 kg</td>
                  <td className="py-2 pr-4">
                    <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-full">
                      Reorder
                    </span>
                  </td>
                </tr>

                {/* 4: Onions */}
                <tr className="border-b border-gray-200 last:border-0">
                  <td className="py-2 pr-4 font-semibold text-gray-900">
                    Onions
                  </td>
                  <td className="py-2 pr-4">75 kg</td>
                  <td className="py-2 pr-4">60 kg</td>
                  <td className="py-2 pr-4">15 kg</td>
                  <td className="py-2 pr-4">
                    <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-full">
                      Reorder
                    </span>
                  </td>
                </tr>

                {/* 5: Cheese */}
                <tr className="border-b border-gray-200 last:border-0">
                  <td className="py-2 pr-4 font-semibold text-gray-900">
                    Cheese
                  </td>
                  <td className="py-2 pr-4">50 kg</td>
                  <td className="py-2 pr-4">35 kg</td>
                  <td className="py-2 pr-4">15 kg</td>
                  <td className="py-2 pr-4">
                    <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-full">
                      Reorder
                    </span>
                  </td>
                </tr>

                {/* 6: Rice */}
                <tr className="border-b border-gray-200 last:border-0">
                  <td className="py-2 pr-4 font-semibold text-gray-900">
                    Rice
                  </td>
                  <td className="py-2 pr-4">60 kg</td>
                  <td className="py-2 pr-4">60 kg</td>
                  <td className="py-2 pr-4">0 kg</td>
                  <td className="py-2 pr-4">
                    <span className="inline-block px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
                      Sufficient
                    </span>
                  </td>
                </tr>

                {/* 7: Potatoes */}
                <tr className="border-b border-gray-200 last:border-0">
                  <td className="py-2 pr-4 font-semibold text-gray-900">
                    Potatoes
                  </td>
                  <td className="py-2 pr-4">80 kg</td>
                  <td className="py-2 pr-4">65 kg</td>
                  <td className="py-2 pr-4">15 kg</td>
                  <td className="py-2 pr-4">
                    <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-full">
                      Reorder
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Seasonal & Weekly Trends */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Seasonal &amp; Weekly Trends
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Ingredient usage patterns over time
          </p>

          <div className="space-y-4">
            {/* Summer Trends */}
            <div className="border border-gray-200 rounded-md p-4">
              <h3 className="font-medium text-gray-900 mb-1">Summer Trends</h3>
              <p className="text-sm text-gray-600">
                Citrus fruit, fresh herbs, and seafood usage spikes in summer
                months. Consider increasing stock by 5-20%.
              </p>
            </div>

            {/* Weekend Patterns */}
            <div className="border border-gray-200 rounded-md p-4">
              <h3 className="font-medium text-gray-900 mb-1">
                Weekend Patterns
              </h3>
              <p className="text-sm text-gray-600">
                Premium ingredients like steak and seafood see 30% higher usage
                on weekends. Adjust ordering schedule accordingly.
              </p>
            </div>

            {/* Smart Reordering */}
            {/* Trend Insights */}
            <div className="border border-gray-200 rounded-md p-4">
              <h3 className="font-medium text-gray-900 mb-1">Trend Insights</h3>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Seasonal spikes may lead to temporary supply shortages.</li>
                <li>
                  Weekend demand boosts high-margin items—optimize promotions.
                </li>
                <li>
                  Monitor inventory closely to prevent overstock and waste.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
