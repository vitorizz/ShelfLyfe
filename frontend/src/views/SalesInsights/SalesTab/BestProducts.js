import { useState } from "react";
import SectionLabel from "../../../components/SectionLabel";

const categories = ["Best Sellers", "Worst Sellers"];

const stats = {
  "Best Sellers": {
    name: [
      "Most Popular Appetizer",
      "Best Selling Dish",
      "Most Popular Desert",
      "Most Consumed Ingredient",
      "Highest Rated Dish",
    ],
    stat: ["Bruschetta", "Margherita Pizza", "Brownies", "Tomatoes", "BBQ Ribs"],
  },
  "Worst Sellers": {
    name: [
      "Worst Selling Appetizer",
      "Worst Selling Dish",
      "Worst Selling Desert",
      "Least Consumed Ingredient",
      "Lowest Rated Dish",
    ],
    stat: ["Stuffed Mushrooms", "Veggie Pizza", "Cheesecake", "Anchovies", "Fruit Salad"],
  },
};

export default function BestProducts() {
  const [selectedCategory, setSelectedCategory] = useState("Best Sellers");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const currentStats = stats[selectedCategory];

  return (
    <div className="pt-10">
      <SectionLabel title="Top Menu Items" subtitle="Last 30 Days" />

      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mt-4">
        Select Category
      </label>
      <select
        id="category"
        name="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      >
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-1">
        {currentStats.name.map((label, index) => (
          <div
            key={label}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-m font-medium text-gray-700">
              {label}
            </dt>
            <dd className="mt-1 text-2xl font-semibold tracking-tight text-blue-600">
              {currentStats.stat[index]}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

