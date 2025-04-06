import React, { useState } from "react";
import SalesInfo from "./SalesTab/SalesInfo";
import Tabs from "../../components/Tabs";

const tabs = [
  { name: "Earnings Analysis", current: true },
];

const tabComponents = {
  "Earnings Analysis": <SalesInfo />,
};

export default function SalesDashboard() {
  const [currentTab, setCurrentTab] = useState("Earnings Analysis");

  // Update the tabs array's current property based on the currentTab state (For when we want to add more tabs)
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
