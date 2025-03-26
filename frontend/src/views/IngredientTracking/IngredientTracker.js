import React, { useState, useEffect } from "react";
import ProductTrendsModal from "./ProductTrendsModal";
import OrderActivityModal from "./OrderActivityModal";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { getAllIngredients } from "../../api/ingredients";

const InventoryPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedActivityIngredient, setSelectedActivityIngredient] =
    useState(null);
  const [selectedTrendsIngredient, setSelectedTrendsIngredient] =
    useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 25; // Number of items per page

  useEffect(() => {
    const fetchIngredients = async () => {
      setIsLoading(true);
      try {
        const data = await getAllIngredients();
        setIngredients(data);
        setFilteredIngredients(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch ingredients: " + err.message);
        console.error("Error fetching ingredients:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  const toggleActivityModal = (ingredient) => {
    setSelectedActivityIngredient(ingredient);
    setSelectedTrendsIngredient(null);
  };

  const toggleTrendsModal = (ingredient) => {
    setSelectedTrendsIngredient(ingredient);
    setSelectedActivityIngredient(null);
  };

  const closeModals = () => {
    setSelectedActivityIngredient(null);
    setSelectedTrendsIngredient(null);
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
    if (ingredients.length > 0) {
      setFilteredIngredients(
        ingredients.filter(
          (ingredient) =>
            ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ingredient.sku.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, ingredients]);

  const sortIngredients = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    if (filteredIngredients.length > 0) {
      const sortedIngredients = [...filteredIngredients].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
      setFilteredIngredients(sortedIngredients);
    }
  }, [sortConfig]);

  const totalPages = Math.ceil(filteredIngredients.length / itemsPerPage);
  const displayedIngredients = filteredIngredients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return <div className="text-center p-8">Loading ingredients...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="relative px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6 text-gray-900">
            Inventory
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Detailed view of all ingredients including stock levels and sales
            metrics.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <input
            type="text"
            placeholder="Search by Ingredient Name or SKU"
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
                  "orders",
                  "Expiry Date",
                  "Month Increase",
                  "Year Increase",
                ].map((key) => (
                  <th
                    key={key}
                    onClick={() => sortIngredients(key)}
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
                  Ingredient Trends
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayedIngredients.map((ingredient) => (
                <tr key={ingredient._id || ingredient.id}>
                  <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                    {ingredient.name}
                  </td>
                  <td className="px-2 py-2 text-sm text-gray-900">
                    {ingredient.sku}
                  </td>
                  <td className="px-2 py-2 text-sm text-gray-900">
                    {ingredient.stock}
                  </td>
                  <td className="px-2 py-2 text-sm text-gray-900">
                    {ingredient.price}
                  </td>
                  <td className="px-2 py-2 text-sm text-gray-900">
                    {ingredient.orders}
                  </td>
                  <td className="px-2 py-2 text-sm text-gray-900">
                    {ingredient.expiry_date
                      ? ingredient.expiry_date.split("T")[0]
                      : ""}
                  </td>
                  <td className="px-2 py-2 text-sm text-gray-900">
                    {ingredient.monthIncrease}
                  </td>
                  <td className="px-2 py-2 text-sm text-gray-900">
                    {ingredient.yearIncrease}
                  </td>
                  <td className="px-2 py-2 text-sm text-gray-900">
                    <button
                      onClick={() => toggleActivityModal(ingredient)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Activity Report
                    </button>
                  </td>
                  <td className="px-2 py-2 text-sm text-gray-900">
                    <button
                      onClick={() => toggleTrendsModal(ingredient)}
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
        {filteredIngredients.length > 0 ? (
          <div className="mt-20 flex justify-between">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 border rounded-md bg-gray-200 text-gray-700"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2 text-sm text-gray-700">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 border rounded-md bg-gray-200 text-gray-700"
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
        ) : (
          <div className="text-center p-4 mt-4">No ingredients found</div>
        )}
      </div>
      {selectedActivityIngredient && (
        <OrderActivityModal
          product={selectedActivityIngredient}
          onClose={closeModals}
        />
      )}
      {selectedTrendsIngredient && (
        <ProductTrendsModal
          product={selectedTrendsIngredient}
          onClose={closeModals}
        />
      )}
    </div>
  );
};

export default InventoryPage;
