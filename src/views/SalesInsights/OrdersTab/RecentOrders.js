import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import SectionLabel from "../../../components/SectionLabel";

const statuses = {
  Paid: "text-green-700 bg-green-50 ring-green-600/20",
  Pending: "text-red-700 bg-red-50 ring-red-600/10",
};

const recentSales = [
  {
    id: 1,
    name: "Margherita Pizza",
    imageUrl: "https://via.placeholder.com/48?text=MP",
    lastInvoice: {
      date: "August 10, 2023",
      dateTime: "2023-08-10",
      amount: "$15,000.00",
      status: "Paid",
    },
  },
  {
    id: 2,
    name: "Caesar Salad",
    imageUrl: "https://via.placeholder.com/48?text=CS",
    lastInvoice: {
      date: "August 12, 2023",
      dateTime: "2023-08-12",
      amount: "$8,500.00",
      status: "Paid",
    },
  },
  {
    id: 3,
    name: "BBQ Ribs",
    imageUrl: "https://via.placeholder.com/48?text=BR",
    lastInvoice: {
      date: "August 13, 2023",
      dateTime: "2023-08-13",
      amount: "$12,300.00",
      status: "Pending",
    },
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function RecentOrders() {
  return (
    <div className="pt-10">
      <SectionLabel title="Recent Sales" subtitle="Last 30 Days" />
      <div className="pt-5">
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
        >
          {recentSales.map((sale) => (
            <li
              key={sale.id}
              className="overflow-hidden rounded-xl border border-gray-200"
            >
              <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                <img
                  src={sale.imageUrl}
                  alt={sale.name}
                  className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                />
                <div className="text-sm font-medium leading-6 text-gray-900">
                  {sale.name}
                </div>
                <Menu as="div" className="relative ml-auto">
                  <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Open options</span>
                    <EllipsisHorizontalIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-50" : "",
                              "block px-3 py-1 text-sm leading-6 text-gray-900"
                            )}
                          >
                            View<span className="sr-only">, {sale.name}</span>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-50" : "",
                              "block px-3 py-1 text-sm leading-6 text-gray-900"
                            )}
                          >
                            Edit<span className="sr-only">, {sale.name}</span>
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500">Last Sale Date</dt>
                  <dd className="text-gray-700">
                    <time dateTime={sale.lastInvoice.dateTime}>
                      {sale.lastInvoice.date}
                    </time>
                  </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500">Amount</dt>
                  <dd className="flex items-start gap-x-2">
                    <div className="font-medium text-gray-900">
                      {sale.lastInvoice.amount}
                    </div>
                    <div
                      className={classNames(
                        statuses[sale.lastInvoice.status],
                        "rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset"
                      )}
                    >
                      {sale.lastInvoice.status}
                    </div>
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
