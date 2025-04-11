import React, { useState } from "react";
import { PolarArea } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Auto-registers all components

const categoryData = {
  "Appetizers": {
    labels: ["Caesar Salad", "Bruschetta", "Mozzarella Sticks", "Stuffed Mushrooms"],
    data: [15, 22, 18, 12],
  },
  "Main Meals": {
    labels: ["Margherita Pizza", "Chicken Parmesan", "Grilled Salmon", "Fettucine Alfredo", "BBQ Ribs"],
    data: [37, 30, 22, 25, 32],
  },
  "Desserts": {
    labels: ["Brownies", "Cheesecake", "Ice Cream", "Tiramisu"],
    data: [22, 19, 17, 15],
  },
};

const backgroundColor = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(255, 205, 86, 0.2)",
  "rgba(201, 203, 207, 0.2)",
  "rgba(54, 162, 235, 0.2)",
];

const borderColor = [
  "rgb(255, 99, 132)",
  "rgb(75, 192, 192)",
  "rgb(255, 205, 86)",
  "rgb(201, 203, 207)",
  "rgb(54, 162, 235)",
];

export default function BestSellerPie() {
  const [selectedCategory, setSelectedCategory] = useState("Appetizers");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const selectedData = categoryData[selectedCategory];

  const chartData = {
    labels: selectedData.labels,
    datasets: [
      {
        label: "# of Orders",
        data: selectedData.data,
        backgroundColor: backgroundColor.slice(0, selectedData.data.length),
        borderColor: borderColor.slice(0, selectedData.data.length),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="pt-5 h-screen px-6">
      <div className="mb-4">

        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Select Category
        </label>
        <select
          id="category"
          name="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="mt-1 block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          {Object.keys(categoryData).map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <dl className="h-2/3 mt-5 grid justify-items-center grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-1 md:divide-x md:divide-y-0">
        <PolarArea data={chartData} />
      </dl>
    </div>
  );
}
