// EarningsDashboard.js
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
  CurrencyDollarIcon,
  FireIcon,
  CreditCardIcon,
  BanknotesIcon,
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

export default function EarningsDashboard() {
  // KPI data
  const kpiData = [
    {
      title: "Projected Earnings (Next Month)",
      value: "$75,500",
      change: "5% from same period last year",
      changeType: "up",
      icon: CurrencyDollarIcon,
    },
    {
      title: "Net Profit Margin (Next Month)",
      value: "18%",
      change: "2% increase from last month",
      changeType: "up",
      icon: BanknotesIcon,
    },
    {
      title: "Average Order Value (Next Month)",
      value: "$32.15",
      change: "5% increase from last month",
      changeType: "up",
      icon: CreditCardIcon,
    },
  ];

  const lineData = {
    labels: ["April", "May", "June", "July", "August", "September"],
    datasets: [
      {
        label: "Next 6 Months",
        data: [75500, 76000, 78500, 79500, 81000, 84000],
        borderColor: "#2563EB", // Tailwind blue-600
        backgroundColor: "#2563EB",
        fill: false,
        tension: 0.3,
      },
      {
        label: "Last Year's Next 6 Months",
        data: [67000, 66000, 69000, 70000, 71000, 75000],
        borderColor: "#10B981", // Tailwind green-500
        backgroundColor: "#10B981",
        fill: false,
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
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => `$${value / 1000}K`,
        },
      },
    },
  };

  // Promotional Recommendations
  const recommendations = [
    {
      title: "Seasonal Promotion",
      details:
        "Consider summer specials featuring Grilled Salmon and fresh salads to capitalize on current trends",
    },
    {
      title: "Bundle Offer",
      details:
        "Create meal bundles with Chicken Parmesan and Beef Burger to increase average order value",
    },
    {
      title: "Happy Hour Special",
      details:
        "Introduce weekday happy hour specials to boost traffic during slower periods",
    },
  ];

  // Revenue Breakdown
  const revenueBreakdown = [
    { label: "Dine-in", amount: "$33,975" },
    { label: "Delivery", amount: "$26,425" },
    { label: "Takeout", amount: "$15,100" },
  ];
  const totalProjectedRevenue = "$75,500";

  return (
    <div className="bg-white text-gray-800">
      <main className="max-w mx-auto px-4 py-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpiData.map((kpi, idx) => {
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

        {/* Earnings Projection */}
        <div className="bg-white border border-gray-200 rounded-lg shadow px-6 py-5">
          <div className="mb-2">
            <h2 className="text-lg font-semibold text-gray-900">
              Earnings Projection
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Comparison of this year's vs last year's earnings
            </p>
          </div>
          <div className="h-72 mt-4">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        {/* Bottom Grid: Recommendations & Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Promotional Recommendations */}
          <div className="bg-white border border-gray-200 rounded-lg shadow px-6 py-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Data Driven Promotional Recommendations
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Suggested actions to increase revenue
            </p>

            <ul className="space-y-4">
              {/* Recommendation #1 */}
              <li className="border border-gray-200 rounded-md p-4">
                <h3 className="font-medium text-gray-900 mb-1">
                  Seasonal Promotion
                </h3>
                <p className="text-sm text-gray-600">
                  Consider summer specials featuring Grilled Salmon and fresh
                  salads to capitalize on current trends.
                </p>
              </li>

              {/* Recommendation #2 */}
              <li className="border border-gray-200 rounded-md p-4">
                <h3 className="font-medium text-gray-900 mb-1">Bundle Offer</h3>
                <p className="text-sm text-gray-600">
                  Create meal bundles with Chicken Parmesan and Beef Burger to
                  increase average order value.
                </p>
              </li>

              {/* Recommendation #3 */}
              <li className="border border-gray-200 rounded-md p-4">
                <h3 className="font-medium text-gray-900 mb-1">
                  Happy Hour Special
                </h3>
                <p className="text-sm text-gray-600">
                  Introduce weekday happy hour specials to boost traffic during
                  slower periods.
                </p>
              </li>
            </ul>
          </div>

          {/* Revenue Breakdown */}
          <div className="bg-white border border-gray-200 rounded-lg shadow px-6 py-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Projected Revenue Breakdown
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Projected earnings by category for the next month
            </p>

            <ul className="divide-y divide-gray-100">
              {/* Dine-in */}
              <li className="py-3 flex items-center justify-between">
                <div>
                  <div className="text-gray-900 font-medium">Dine-in</div>
                  <div className="text-sm text-gray-500">
                    45% of total revenue
                  </div>
                </div>
                <div className="text-gray-900 font-medium">$33,975</div>
              </li>

              {/* Delivery */}
              <li className="py-3 flex items-center justify-between">
                <div>
                  <div className="text-gray-900 font-medium">Delivery</div>
                  <div className="text-sm text-gray-500">
                    35% of total revenue
                  </div>
                </div>
                <div className="text-gray-900 font-medium">$26,425</div>
              </li>

              {/* Takeout */}
              <li className="py-3 flex items-center justify-between">
                <div>
                  <div className="text-gray-900 font-medium">Takeout</div>
                  <div className="text-sm text-gray-500">
                    20% of total revenue
                  </div>
                </div>
                <div className="text-gray-900 font-medium">$15,100</div>
              </li>
            </ul>

            {/* Total Projected Revenue */}
            <div className="border-t border-gray-300 mt-4 pt-3 flex items-center justify-between">
              <span className="text-gray-900 font-medium">
                Total Projected Revenue
              </span>
              <span className="text-black-900 font-bold">$75,500</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
