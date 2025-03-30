// WasteReductionDashboard.js
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
import { Line } from "react-chartjs-2";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  InformationCircleIcon, // Example icon for top-right corner
} from "@heroicons/react/20/solid";
import {
  ArchiveBoxIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/20/solid";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function WasteReduction() {
  // KPI cards data
  const KPIData = [
    {
      title: "Projected Waste (Next Month)",
      value: "28 kg",
      change: "10% reduction possible",
      changeType: "up",
      icon: ArchiveBoxIcon,
    },
    {
      title: "Potential Savings (Next Month)",
      value: "$425",
      change: "6 recommended actions taken",
      changeType: "up",
      icon: CurrencyDollarIcon,
    },
    {
      title: "Items at Risk (Next Month)",
      value: "3",
      change: "2 fewer than last week",
      changeType: "down",
      icon: ExclamationTriangleIcon,
    },
  ];

  // Updated line chart data for Waste Reduction Forecast
  const lineData = {
    labels: ["April", "May", "June", "July", "August"],
    datasets: [
      {
        label: "Actual Waste (kg)",
        // New trajectory: Week 1 below threshold, Week 2 & 3 above, Week 4 below, Week 5 above
        data: [28, 32, 30, 19, 29],
        borderColor: "#1F2937", // dark gray
        backgroundColor: "#1F2937",
        fill: false,
        tension: 0.3,
      },
      {
        label: "Target Threshold (kg)",
        data: [25, 25, 25, 25, 25],
        borderColor: "#DC2626", // red-600
        backgroundColor: "#DC2626",
        fill: false,
        borderDash: [5, 5],
        tension: 0.3,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "bottom" } },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, ticks: { stepSize: 5 } },
    },
  };

  return (
    <div className="bg-white text-gray-800">
      <main className="max-w mx-auto px-4 py-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {KPIData.map((kpi, idx) => {
            const IconComponent = kpi.icon;
            return (
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
                  <IconComponent className="h-8 w-8 text-gray-300" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Grid: Chart & Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Waste Reduction Forecast Chart */}
          <div className="lg:col-span-2 p-6 bg-white border border-gray-200 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Waste Reduction Forecast
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Actual Waste vs Target Threshold
            </p>
            <div className="h-64">
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>

          {/* Ingredients at Risk */}
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Historically At-Risk Ingredients
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Ingredients that have been most at risk in the past and likely to
              be at risk in the future.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="pb-2 font-medium">Ingredient</th>
                    <th className="pb-2 font-medium">Times Expired</th>
                    <th className="pb-2 font-medium">Total Quantity Expired</th>
                    <th className="pb-2 font-medium">Amount of Money Wasted</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 last:border-0">
                    <td className="py-2 pr-4 font-semibold text-gray-900">
                      Lettuce
                    </td>
                    <td className="py-2 pr-4">3</td>
                    <td className="py-2 pr-4">2.1 kg</td>
                    <td className="py-2 pr-4">
                      <span className="inline-block px-2 py-0.5 text-xs font-medium text-red-700 bg-red-100 rounded-full">
                        $30
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 last:border-0">
                    <td className="py-2 pr-4 font-semibold text-gray-900">
                      Tomatoes
                    </td>
                    <td className="py-2 pr-4">2</td>
                    <td className="py-2 pr-4">1.8 kg</td>
                    <td className="py-2 pr-4">
                      <span className="inline-block px-2 py-0.5 text-xs font-medium text-red-700 bg-red-100 rounded-full">
                        $25
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 last:border-0">
                    <td className="py-2 pr-4 font-semibold text-gray-900">
                      Fresh Herbs
                    </td>
                    <td className="py-2 pr-4">4</td>
                    <td className="py-2 pr-4">1.0 kg</td>
                    <td className="py-2 pr-4">
                      <span className="inline-block px-2 py-0.5 text-xs font-medium text-red-700 bg-red-100 rounded-full">
                        $15
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Recommended Actions:
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                <li>
                  <span className="font-bold text-gray-900">Lettuce:</span> Use
                  in daily special
                </li>
                <li>
                  <span className="font-bold text-gray-900">Tomatoes:</span>{" "}
                  Reduce next order
                </li>
                <li>
                  <span className="font-bold text-gray-900">Fresh Herbs:</span>{" "}
                  Use in sauce prep
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
