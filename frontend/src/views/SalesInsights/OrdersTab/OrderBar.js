import React from "react";
import SectionLabel from "../../../components/SectionLabel";
import SupplierCharts from "./Charts";
import RecentOrders from "./RecentOrders";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckBadgeIcon,
  InboxArrowDownIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/20/solid";

const stats = [
  {
    id: 1,
    name: "Pending Inventory Audits",
    stat: "35",
    icon: InboxArrowDownIcon,
    change: "5",
    changeType: "increase",
  },
  {
    id: 2,
    name: "In-Progress Stock Reviews",
    stat: "28",
    icon: PaperAirplaneIcon,
    change: "3",
    changeType: "increase",
  },
  {
    id: 3,
    name: "Waste Reduction Achieved",
    stat: "15%",
    icon: CheckBadgeIcon,
    change: "15%",
    changeType: "increase",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ActivityBar() {
  return (
    <>
      <div className="pt-5">
        <SectionLabel title="Inventory Activity" subtitle="Last 30 Days" />
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className="absolute rounded-md bg-blue-400 p-3">
                  <item.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  {item.name}
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">
                  {item.stat}
                </p>
                <p
                  className={classNames(
                    item.changeType === "increase"
                      ? "text-green-600"
                      : "text-red-600",
                    "ml-2 flex items-baseline text-sm font-semibold"
                  )}
                >
                  {item.changeType === "increase" ? (
                    <ArrowUpIcon
                      className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowDownIcon
                      className="h-5 w-5 flex-shrink-0 self-center text-red-500"
                      aria-hidden="true"
                    />
                  )}
                  <span className="sr-only">
                    {item.changeType === "increase" ? "Increased" : "Decreased"}{" "}
                    by
                  </span>
                  {item.change}
                </p>
                <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      View all
                      <span className="sr-only"> {item.name} stats</span>
                    </a>
                  </div>
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <SupplierCharts />
    </>
  );
}
