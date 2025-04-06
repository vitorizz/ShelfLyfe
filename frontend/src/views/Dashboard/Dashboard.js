import {
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarIcon,
  ChartBarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  ArchiveBoxIcon,
  ShoppingCartIcon,
  BeakerIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("categories");
  const [expiryAlerts, setExpiryAlerts] = useState([]);
  const [lowStockAlerts, setLowStockAlerts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/get-expiring-ingredients")
      .then((res) => res.json())
      .then((data) => setExpiryAlerts(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/get-low-stock-ingredients")
      .then((res) => res.json())
      .then((data) => setLowStockAlerts(data))
      .catch((err) => console.error(err));
  }, []);

  const getExpiryLabel = (expiryDateStr) => {
    const expiryDate = new Date(expiryDateStr);
    const now = new Date();
    const diffTime = expiryDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return "Expired";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays === 0) return "Today";
    return `${diffDays} days`;
  };

  const computeStockPercentage = (stock, warningStockAmount) => {
    const percentage = (stock / warningStockAmount) * 100;
    return Math.round(percentage);
  };

  const lineData = {
    labels: ["March", "April", "May", "June", "July", "August"],
    datasets: [
      {
        label: "Waste Production (%)",
        data: [30, 28, 32, 27, 29, 26],
        borderColor: "#60a5fa",
        backgroundColor: "#1d4ed8",
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
      y: { beginAtZero: true, ticks: { stepSize: 5 } },
    },
  };

  const topMeals = [
    { name: "Grilled Salmon", orders: 245, direction: "up" },
    { name: "Chicken Parmesan", orders: 198, direction: "up" },
    { name: "Caesar Salad", orders: 156, direction: "down" },
    { name: "Beef Burger", orders: 142, direction: "down" },
    { name: "Vegetable Pasta", orders: 118, direction: "up" },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <button 
          onClick={() => window.location.href = '/enter-orders'}
          className="flex items-center gap-2 rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <PlusIcon className="h-5 w-5" />
          Enter Today's Orders
        </button>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Expiry Alerts Card */}
          <div className="col-span-2 rounded-lg border border-gray-200 bg-white shadow-sm border-l-4 border-l-red-500">
            <div className="p-4 pb-2">
              <h1 className="text-base font-semibold">Expiry Alerts</h1>
              <p className="text-sm text-gray-500">Items expiring soon</p>
            </div>
            <div className="p-4 pt-0">
              <div className="text-2xl font-bold">{expiryAlerts.length} items</div>
              <div className="mt-4 space-y-2">
                {expiryAlerts.map((item) => (
                  <div key={item._id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span>{item.name}</span>
                      <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                        {getExpiryLabel(item.expiry_date)}
                      </span>
                    </div>
                    <button className="text-sm text-gray-600 hover:text-gray-900 hover:underline">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Low Stock Alerts Card */}
          <div className="col-span-2 rounded-lg border border-gray-200 bg-white shadow-sm border-l-4 border-l-amber-500">
            <div className="p-4 pb-2">
              <h3 className="text-base font-semibold">Low Stock Alerts</h3>
              <p className="text-sm text-gray-500">Items below minimum threshold</p>
            </div>
            <div className="p-4 pt-0">
              <div className="text-2xl font-bold">{lowStockAlerts.length} items</div>
              <div className="mt-4 space-y-2">
                {lowStockAlerts.map((item) => (
                  <div key={item._id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span>{item.name}</span>
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                        {computeStockPercentage(item.stock, item.warningStockAmount)}% left
                      </span>
                    </div>
                    <button 
                      onClick={() => window.location.href = '/resupply-ingredients'}
                      className="text-sm text-gray-600 hover:text-gray-900 hover:underline">
                      Order
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Update Prompt */}
        <div className="w-full bg-blue-700 rounded-lg p-4 mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Ready to update your inventory?</h2>
          <button 
            onClick={() => window.location.href = '/enter-orders'} 
            className="group relative w-50 h-16 bg-white text-blue-700 text-xl font-bold py-4 px-8 rounded-lg flex items-center justify-center overflow-hidden">
            <span className="transition-transform duration-300 group-hover:-translate-x-4">
              Enter Today's Orders
            </span>
            <ArrowRightIcon className="absolute right-4 h-5 w-5 opacity-0 transition-all duration-300 group-hover:opacity-100" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 w-full">
          {/* Left Column: Projected Top Dishes Card */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow">
              <h3 className="text-lg font-semibold mb-2">Projected Top Dishes</h3>
              <p className="text-sm text-gray-500 mb-4">Most popular dishes by order volume</p>
              <ul className="divide-y divide-gray-100">
                {topMeals.map((meal, idx) => (
                  <li key={idx} className="py-3 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">{meal.name}</span>
                      <span className="text-sm text-gray-500">{meal.orders} orders</span>
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

          {/* Right Column: Stacked KPI Cards */}
          <div className="lg:w-1/2 flex flex-col gap-4">
            {/* Top Ingredient in Demand */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow relative">
              <h3 className="text-lg font-semibold mb-2">Top Ingredient in Demand</h3>
              <p className="mt-2 text-2xl font-bold">Tomatoes</p>
              <p className="mt-1 text-sm text-green-600">+10% from last month</p>
              <div className="absolute bottom-4 right-4">
                <button 
                  onClick={() => window.location.href = '/ingredient-tracker'}
                  className="group relative bg-blue-700 text-white hover:bg-blue-800 px-4 py-2 rounded-md overflow-hidden"
                >
                  <span className="transition-transform duration-300 inline-block">
                    View Inventory
                  </span>
                </button>
              </div>
            </div>
            
            {/* Ingredients at Risk of Shortage */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow relative">
              <h3 className="text-lg font-semibold mb-2">Ingredients at Risk of Shortage</h3>
              <p className="mt-2 text-2xl font-bold">4</p>
              <p className="mt-1 text-sm text-red-600">+1 more than last week</p>
              <div className="absolute bottom-4 right-4">
                <button 
                  onClick={() => window.location.href = '/resupply-ingredients'}
                  className="group relative bg-blue-700 text-white px-4 py-2 hover:bg-blue-800 rounded-md overflow-hidden"
                >
                  <span className="transition-transform duration-300 inline-block">
                    Go to Resupply
                  </span>
                </button>
              </div>
            </div>
            
            {/* Potential Savings */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow relative">
              <h3 className="text-lg font-semibold mb-2">Potential Savings</h3>
              <p className="mt-2 text-2xl font-bold">$350</p>
              <p className="mt-1 text-sm text-green-600">With optimized ordering</p>
              <div className="absolute bottom-4 right-4">
                <button 
                  onClick={() => window.location.href = '/sales-insights'}
                  className="group relative bg-blue-700 text-white px-4 py-2 hover:bg-blue-800 rounded-md overflow-hidden"
                >
                  <span className="transition-transform duration-300 inline-block">
                    View Sales Insights
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-gray-200 bg-white shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Waste Production History
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Past 6 month history of waste production percentage
          </p>
          <div className="h-64">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
      </main>
    </div>
  );
}
