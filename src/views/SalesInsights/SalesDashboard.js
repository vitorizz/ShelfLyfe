import React, { useState } from "react";
import OrderBar from "./OrdersTab/OrderBar";
import SalesInfo from "./SalesTab/SalesInfo";
import Tabs from "../../components/Tabs";

const tabs = [
  { name: "Order Insights", current: true }, // Default tab
  { name: "Earnings Analysis", current: false },
];

const tabComponents = {
  "Order Insights": <OrderBar />,
  "Earnings Analysis": <SalesInfo />,
};

export default function SalesDashboard() {
  const [currentTab, setCurrentTab] = useState("Order Insights");

  // Update the tabs array's current property based on the currentTab state
  const updatedTabs = tabs.map((tab) => ({
    ...tab,
    current: tab.name === currentTab,
  }));

  const onTabChange = (selectedTabName) => {
    setCurrentTab(selectedTabName);
  };

  return (
    <div>
      <Tabs tabs={updatedTabs} onTabChange={onTabChange} />
      {tabComponents[currentTab]}
    </div>
  );
}
