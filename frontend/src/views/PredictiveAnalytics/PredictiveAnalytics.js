import React, { useState } from "react";
import OrdersAndDishes from "./OrdersAndDishes";
import WasteReduction from "./WasteReduction";
import Earnings from "./Earnings";

export default function PredictiveAnalytics() {
  const [activeTab, setActiveTab] = useState("ordersanddishes");

  const renderContent = () => {
    switch (activeTab) {
      case "ordersanddishes":
        return <OrdersAndDishes />;
      case "wastereduction":
        return <WasteReduction />;
      case "earnings":
        return <Earnings />;
      case "ingredientdemand":
        return <div>Ingredient Demand Component</div>;
      default:
        return null;
    }
  };

  const tabClass = (tabName) =>
    `pb-2 text-lg font-medium ${
      activeTab === tabName
        ? "text-gray-900 border-b-2 border-blue-600"
        : "text-gray-500 hover:text-gray-700"
    }`;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Predictive Analytics Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Projected orders and dishes for the next 6 months
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-8 border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab("ordersanddishes")}
          className={tabClass("ordersanddishes")}
        >
          Orders & Dishes
        </button>
        <button
          onClick={() => setActiveTab("wastereduction")}
          className={tabClass("wastereduction")}
        >
          Waste Reduction
        </button>
        <button
          onClick={() => setActiveTab("earnings")}
          className={tabClass("earnings")}
        >
          Earnings
        </button>
        <button
          onClick={() => setActiveTab("ingredientdemand")}
          className={tabClass("ingredientdemand")}
        >
          Ingredient Demand
        </button>
      </div>

      {/* Render selected tab content */}
      <div>{renderContent()}</div>
    </div>
  );
}
