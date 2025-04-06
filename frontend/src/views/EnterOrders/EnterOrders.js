import React, { useState, useEffect } from "react";
import { FaUtensils, FaHamburger, FaIceCream, FaTrash } from "react-icons/fa";
import { getAllMenuItems } from "../../api/menu-items"; // Reuse the recipe API

export default function EnterOrders() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recipes, setRecipes] = useState({}); // Grouped recipes by category
  const [orderCounts, setOrderCounts] = useState({}); // Maps recipe.id (as string) -> { name, count }
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [popupAmounts, setPopupAmounts] = useState({});
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  // Group recipes by category (e.g., Appetizers, Mains, Desserts)
  const groupByCategory = (recipesArray) => {
    return recipesArray.reduce((acc, recipe) => {
      const category = recipe.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(recipe);
      return acc;
    }, {});
  };

  // Reset the "order submitted" state when user adds new items
  useEffect(() => {
    if (orderSubmitted && Object.keys(orderCounts).length > 0) {
      setOrderSubmitted(false);
    }
  }, [orderCounts, orderSubmitted]);

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      try {
        const data = await getAllMenuItems();
        const grouped = groupByCategory(data);
        setRecipes(grouped);
        setError(null);
      } catch (err) {
        setError("Failed to fetch recipes: " + err.message);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  // When a category button is clicked, set the selected category and initialize amounts
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (recipes[category]) {
      const initialAmounts = {};
      recipes[category].forEach((recipe) => {
        initialAmounts[String(recipe.id)] = 0;
      });
      setPopupAmounts(initialAmounts);
    }
  };

  // Update the amount for a given recipe
  const handlePopupAmountChange = (recipeId, value) => {
    setPopupAmounts((prev) => ({
      ...prev,
      [String(recipeId)]: Number(value),
    }));
  };

  // When "Add" is pressed, update order counts for each recipe
  const handleAddOrders = () => {
    setOrderCounts((prevOrders) => {
      const updatedOrders = { ...prevOrders };
      Object.keys(popupAmounts).forEach((recipeId) => {
        const amount = popupAmounts[recipeId];
        if (amount > 0 && selectedCategory && recipes[selectedCategory]) {
          // Find the recipe in the selected category
          const recipe = recipes[selectedCategory].find(
            (r) => String(r.id) === recipeId
          );
          if (recipe) {
            if (updatedOrders[recipeId]) {
              updatedOrders[recipeId].count += amount;
            } else {
              updatedOrders[recipeId] = { name: recipe.name, count: amount };
            }
          }
        }
      });
      return updatedOrders;
    });
    
    // Reset amounts after adding
    if (selectedCategory && recipes[selectedCategory]) {
      const resetAmounts = {};
      recipes[selectedCategory].forEach((recipe) => {
        resetAmounts[String(recipe.id)] = 0;
      });
      setPopupAmounts(resetAmounts);
    }
  };

  const handleSubmitOrders = async () => {
    setIsLoading(true);
    try {
      // Simulate network request with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Actual API call (commented out for now)
      // const response = await fetch("http://localhost:8000/submit-orders", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(orderCounts),
      // });
      // const result = await response.json();
      
      console.log("Orders submitted:", orderCounts);
      
      // Clear orders and set submitted state
      setOrderCounts({});
      setOrderSubmitted(true);
    } catch (error) {
      console.error("Error submitting orders:", error);
      setError("Failed to submit orders. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start overflow-hidden p-4">
      <h1 className="text-3xl font-bold mt-4 mb-10">Enter Orders</h1>
      
      {/* Top Category Buttons */}
      <div className="flex space-x-20 mb-10">
        <button
          onClick={() => handleCategoryClick("Appetizers")}
          className={`flex items-center px-32 py-48 border border-gray-300 rounded-lg text-xl font-semibold shadow-md transition-colors ${
            selectedCategory === "Appetizers" ? "bg-blue-100" : "bg-white hover:bg-blue-100"
          }`}
        >
          <FaUtensils className="mr-3" size={32} />
          Appetizers
        </button>
        <button
          onClick={() => handleCategoryClick("Mains")}
          className={`flex items-center px-32 py-48 border border-gray-300 rounded-lg text-xl font-semibold shadow-md transition-colors ${
            selectedCategory === "Mains" ? "bg-blue-100" : "bg-white hover:bg-blue-100"
          }`}
        >
          <FaHamburger className="mr-3" size={32} />
          Mains
        </button>
        <button
          onClick={() => handleCategoryClick("Desserts")}
          className={`flex items-center px-32 py-48 border border-gray-300 rounded-lg text-xl font-semibold shadow-md transition-colors ${
            selectedCategory === "Desserts" ? "bg-blue-100" : "bg-white hover:bg-blue-100"
          }`}
        >
          <FaIceCream className="mr-3" size={32} />
          Desserts
        </button>
      </div>

      {/* Main content area with Recipe List and Order Count */}
      <div className="w-full flex gap-6">
        {/* Recipe List (left side) - Always visible */}
        <div className="w-1/2 bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-4">Enter Amounts:</h2>
          {selectedCategory && recipes[selectedCategory] ? (
            <>
              <div className="grid grid-cols-1 gap-4">
                {recipes[selectedCategory].map((recipe) => (
                  <div key={recipe.id} className="border border-gray-300 rounded-md p-4 shadow-sm flex justify-between items-center">
                    <span className="text-lg font-semibold">{recipe.name}</span>
                    <input
                      type="number"
                      min="0"
                      value={popupAmounts[String(recipe.id)] || 0}
                      onChange={(e) => handlePopupAmountChange(recipe.id, e.target.value)}
                      onFocus={(e) => {
                        if (e.target.value === "0") {
                          e.target.value = "";
                        }
                      }}
                      onBlur={(e) => {
                        if (e.target.value === "") {
                          e.target.value = "0";
                          handlePopupAmountChange(recipe.id, 0);
                        }
                      }}
                      className="w-28 border border-gray-300 rounded-md p-2 text-base"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleAddOrders}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                >
                  Add
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center py-10">
              Please choose a category from above to see available items
            </p>
          )}
        </div>

        {/* Order Count Box (right side) */}
        <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Order Count</h2>
          {orderSubmitted ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="text-green-600 text-xl mb-2">✓</div>
              <p className="text-green-700 font-medium text-lg">Orders Submitted</p>
              <p className="text-gray-500 text-sm mt-2">
                Add more items to create a new order
              </p>
            </div>
          ) : Object.keys(orderCounts).length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(orderCounts).map(([id, order]) => (
                <div key={id} className="border border-gray-300 rounded-md p-4 shadow-sm flex justify-between items-center">
                  <p className="text-lg font-semibold">{order.name}</p>
                  <div className="flex items-center space-x-3">
                    <p className="text-gray-700 font-medium">
                      x {order.count}
                    </p>
                    <button
                      onClick={() => {
                        setOrderCounts(prev => {
                          const updated = {...prev};
                          if (updated[id].count > 1) {
                            updated[id].count -= 1;
                          } else {
                            delete updated[id];
                          }
                          return updated;
                        });
                      }}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center"
                      aria-label="Remove one"
                    >
                      -
                    </button>
                    <button
                      onClick={() => {
                        setOrderCounts(prev => {
                          const updated = {...prev};
                          delete updated[id];
                          return updated;
                        });
                      }}
                      className="bg-red-100 hover:bg-red-200 text-red-600 w-8 h-8 rounded-full flex items-center justify-center"
                      aria-label="Delete item"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No orders yet. Select a category and add orders.
            </p>
          )}
        </div>
      </div>
      
      {/* "Submit Orders" Button */}
      {Object.keys(orderCounts).length > 0 && !orderSubmitted && (
        <div className="mt-8 flex w-full justify-end">
          <button 
            onClick={handleSubmitOrders}
            disabled={isLoading}
            className={`${
              isLoading 
                ? "bg-blue-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-bold py-4 px-8 rounded-lg flex items-center justify-center min-w-48`}
          >
            {isLoading ? (
              "Submitting..."
            ) : (
              "Submit Orders"
            )}
          </button>
        </div>
      )}
    </div>
  );
}