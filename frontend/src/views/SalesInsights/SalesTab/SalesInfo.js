import React from "react";
import SalesStats from "./SalesStats";
import BestSellerPie from "./BestSellerPie";
import SectionLabel from "../../../components/SectionLabel";
import BestProducts from "./BestProducts";

export default function SalesInfo() {
  return (
    <div className="pt-5">
      <SectionLabel
        title="Sales & Inventory Insights"
        subtitle="Last 30 Days"
      />
      <div className="flex flex-wrap -mx-2">
        <div className="w-1/2 px-2">
          <SalesStats />
          <BestProducts />
        </div>
        <div className="w-1/2 h-1 px-2">
          <BestSellerPie />
        </div>
      </div>
      {/* 
      Offered Products Carousel:
      Display a carousel of featured menu items.
      */}
    </div>
  );
}
