import React from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";

const stats = [
  {
    name: "Total Revenue",
    stat: "$95,000",
    previousStat: "$90,000",
    change: "5.6%",
    changeType: "increase",
  },
  {
    name: "Food Waste Reduction",
    stat: "15%",
    previousStat: "0%",
    change: "15%",
    changeType: "increase",
  },
  {
    name: "Alert Response Time",
    stat: "3 sec",
    previousStat: "5 sec",
    change: "40% faster",
    changeType: "increase",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SalesStats() {
  return (
    <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-1 md:divide-x md:divide-y-0">
      {stats.map((item) => (
        <div key={item.name} className="px-4 py-5 sm:p-6">
          <dt className="text-base font-normal text-gray-900">{item.name}</dt>
          <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
            <div className="flex items-baseline text-2xl font-semibold text-blue-600">
              {item.stat}
              <span className="ml-2 text-sm font-medium text-gray-500">
                from {item.previousStat}
              </span>
            </div>
            <div
              className={classNames(
                item.changeType === "increase"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800",
                "inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0"
              )}
            >
              {item.changeType === "increase" ? (
                <ArrowUpIcon
                  className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                  aria-hidden="true"
                />
              ) : (
                <ArrowDownIcon
                  className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                  aria-hidden="true"
                />
              )}
              <span className="sr-only">
                {item.changeType === "increase" ? "Increased" : "Decreased"} by
              </span>
              {item.change}
            </div>
          </dd>
        </div>
      ))}
    </dl>
  );
}
