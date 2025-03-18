import React, { useState, useEffect } from "react";
import ProductTrendsModal from "./ProductTrendsModal";
import OrderActivityModal from "./OrderActivityModal";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

const products = [
  // Example product data
  {
    id: 1,
    name: "Apple",
    sku: "APL001",
    stock: 120,
    price: "0.99",
    returnRate: "2%",
    orders: 200,
    monthIncrease: "5%",
    yearIncrease: "10%",
  },
  {
    id: 2,
    name: "Banana",
    sku: "BNN002",
    stock: 150,
    price: "0.59",
    returnRate: "1.5%",
    orders: 180,
    monthIncrease: "3%",
    yearIncrease: "8%",
  },
  {
    id: 3,
    name: "Cherry",
    sku: "CHY003",
    stock: 90,
    price: "2.99",
    returnRate: "2.5%",
    orders: 75,
    monthIncrease: "4%",
    yearIncrease: "12%",
  },
  {
    id: 4,
    name: "Date",
    sku: "DAT004",
    stock: 50,
    price: "3.49",
    returnRate: "3%",
    orders: 50,
    monthIncrease: "2%",
    yearIncrease: "7%",
  },
  {
    id: 5,
    name: "Elderberry",
    sku: "ELD005",
    stock: 30,
    price: "1.99",
    returnRate: "1%",
    orders: 20,
    monthIncrease: "1%",
    yearIncrease: "3%",
  },
  {
    id: 6,
    name: "Fig",
    sku: "FIG006",
    stock: 60,
    price: "0.89",
    returnRate: "4%",
    orders: 100,
    monthIncrease: "6%",
    yearIncrease: "15%",
  },
  {
    id: 7,
    name: "Grape",
    sku: "GRP007",
    stock: 200,
    price: "0.79",
    returnRate: "1.8%",
    orders: 220,
    monthIncrease: "5%",
    yearIncrease: "10%",
  },
  {
    id: 8,
    name: "Honeydew",
    sku: "HND008",
    stock: 80,
    price: "1.29",
    returnRate: "2.2%",
    orders: 60,
    monthIncrease: "3%",
    yearIncrease: "9%",
  },
  {
    id: 9,
    name: "Ivy Gourd",
    sku: "IVG009",
    stock: 40,
    price: "4.99",
    returnRate: "2%",
    orders: 30,
    monthIncrease: "2%",
    yearIncrease: "11%",
  },
  {
    id: 10,
    name: "Jackfruit",
    sku: "JKF010",
    stock: 70,
    price: "1.49",
    returnRate: "3.5%",
    orders: 85,
    monthIncrease: "4%",
    yearIncrease: "14%",
  },
  {
    id: 11,
    name: "Kiwi",
    sku: "KIW011",
    stock: 120,
    price: "0.99",
    returnRate: "2%",
    orders: 150,
    monthIncrease: "5%",
    yearIncrease: "13%",
  },
  {
    id: 12,
    name: "Lemon",
    sku: "LEM012",
    stock: 160,
    price: "0.29",
    returnRate: "1%",
    orders: 200,
    monthIncrease: "3%",
    yearIncrease: "8%",
  },
  {
    id: 13,
    name: "Mango",
    sku: "MNG013",
    stock: 90,
    price: "0.79",
    returnRate: "2.5%",
    orders: 120,
    monthIncrease: "4%",
    yearIncrease: "12%",
  },
  {
    id: 14,
    name: "Nectarine",
    sku: "NCT014",
    stock: 110,
    price: "1.29",
    returnRate: "1.5%",
    orders: 95,
    monthIncrease: "2%",
    yearIncrease: "7%",
  },
  {
    id: 15,
    name: "Orange",
    sku: "ORG015",
    stock: 200,
    price: "0.59",
    returnRate: "1.8%",
    orders: 210,
    monthIncrease: "3%",
    yearIncrease: "9%",
  },
  {
    id: 16,
    name: "Papaya",
    sku: "PAP016",
    stock: 80,
    price: "1.99",
    returnRate: "3%",
    orders: 70,
    monthIncrease: "4%",
    yearIncrease: "90%",
  },
];

const InventoryPage = () => {
  const [selectedActivityProduct, setSelectedActivityProduct] = useState(null);
  const [selectedTrendsProduct, setSelectedTrendsProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25; // Number of items per page

  const toggleActivityModal = (product) => {
    setSelectedActivityProduct(product);
    setSelectedTrendsProduct(null);
  };

  const toggleTrendsModal = (product) => {
    setSelectedTrendsProduct(product);
    setSelectedActivityProduct(null);
  };

  const closeModals = () => {
    setSelectedActivityProduct(null);
    setSelectedTrendsProduct(null);
  };

  useEffect(() => {
    const handleResize = () => {
      closeModals();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  const sortProducts = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setFilteredProducts(sortedProducts);
  }, [sortConfig, filteredProducts]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="relative px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6 text-gray-900">
            Inventory
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Detailed view of all products including stock levels and sales
            metrics.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <input
            type="text"
            placeholder="Search by Product Name or SKU"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 px-4 py-2 border rounded-md w-96"
          />
          <button className="ml-20 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500">
            Export Data
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                {[
                  "name",
                  "sku",
                  "stock",
                  "price",
                  "returnRate",
                  "orders",
                  "monthIncrease",
                  "yearIncrease",
                ].map((key) => (
                  <th
                    key={key}
                    onClick={() => sortProducts(key)}
                    className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    {sortConfig.key === key ? (
                      sortConfig.direction === "ascending" ? (
                        <ChevronUpIcon className="w-4 h-4 inline-block ml-1" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4 inline-block ml-1" />
                      )
                    ) : null}
                  </th>
                ))}
                <th className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Orders/Activity
                </th>
                <th className="px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Product Trends
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayedProducts.map((product) => (
                <tr key={product.id}>
                  <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                    {product.name}
                  </td>
                  <td className="px-2 py-2 text-sm text-gray-900">
                    {product.sku}
                  </td>
                  <td className="px-2 py-2 text-sm text-gray-900">
                    {product.stock}
                  </td>
                  <td className="px-2 py-2 text-sm text-gray-900">
                    {product.price}
                  </td>
                  <td className="px-2 py-2 text-sm text-gray-900">
                    {product.returnRate}
                  </td>
                  <td className="px-2 py-2 text-sm text-gray-900">
                    {product.orders}
                  </td>
                  <td className="px-2 py-2 text-sm text-gray-900">
                    {product.monthIncrease}
                  </td>
                  <td className="px-2 py-2 text-sm text-gray-900">
                    {product.yearIncrease}
                  </td>
                  <td className="px-2 py-2 text-sm text-gray-900">
                    <button
                      onClick={() => toggleActivityModal(product)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Activity Report
                    </button>
                  </td>
                  <td className="px-2 py-2 text-sm text-gray-900">
                    <button
                      onClick={() => toggleTrendsModal(product)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View Trends
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-20 flex justify-between">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 border rounded-md bg-gray-200 text-gray-700"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 border rounded-md bg-gray-200 text-gray-700"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      {selectedActivityProduct && (
        <OrderActivityModal
          product={selectedActivityProduct}
          onClose={closeModals}
        />
      )}
      {selectedTrendsProduct && (
        <ProductTrendsModal
          product={selectedTrendsProduct}
          onClose={closeModals}
        />
      )}
    </div>
  );
};

export default InventoryPage;
