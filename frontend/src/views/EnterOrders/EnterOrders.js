import React, { useState, useEffect } from "react";
import { FaUtensils, FaHamburger, FaIceCream } from "react-icons/fa";
import { getAllMenuItems } from "../../api/menu-items"; // Reuse the recipe API

export default function EnterOrders() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recipes, setRecipes] = useState({}); // Grouped recipes by category
  const [orderCounts, setOrderCounts] = useState({}); // Maps recipe.id (as string) -> { name, count }
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Popup state for entering amounts for all recipes in a category
  const [showPopup, setShowPopup] = useState(false);
  const [popupAmounts, setPopupAmounts] = useState({});

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

  // When a category button is clicked, set the selected category,
  // initialize the popup amounts for all recipes in that category, and open the popup.
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (recipes[category]) {
      const initialAmounts = {};
      recipes[category].forEach((recipe) => {
        initialAmounts[String(recipe.id)] = 0;
      });
      setPopupAmounts(initialAmounts);
    }
    setShowPopup(true);
  };

  // Update the popup amount for a given recipe
  const handlePopupAmountChange = (recipeId, value) => {
    setPopupAmounts((prev) => ({
      ...prev,
      [String(recipeId)]: Number(value),
    }));
  };

  // When "Add" is pressed in the popup, update order counts for each recipe.
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
    // Close the popup after adding orders
    setShowPopup(false);
    setPopupAmounts({});
  };

  if (isLoading) {
    return <div className="text-center p-8">Loading recipes...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  const handleSubmitOrders = async () => {
    try {
      const response = await fetch("http://localhost:8000/submit-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderCounts),
      });
      const result = await response.json();
      console.log("Orders submitted:", result);
      // Optionally, refresh inventory data here
    } catch (error) {
      console.error("Error submitting orders:", error);
    }
  };

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

      {/* Order Count Box */}
      <div className="w-1/2 ml-auto bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Order Count</h2>
        {Object.keys(orderCounts).length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {Object.values(orderCounts).map((order, idx) => (
              <div key={idx} className="border border-gray-300 rounded-md p-4 shadow-sm flex justify-between items-center">
                <p className="text-lg font-semibold">{order.name}</p>
                <p className="text-gray-700">x {order.count}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No orders yet. Select a category to add orders.
          </p>
        )}
      </div>
      
      {/* "Submit Orders" Button */}
      {selectedCategory && (
        <div className="mt-8 flex w-full justify-end">
          <button 
            onClick={() => handleSubmitOrders}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg">
            Submit Orders
          </button>
        </div>
      )}

      {/* Popup Modal with All Recipes from Selected Category */}
      {showPopup && selectedCategory && recipes[selectedCategory] && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 relative w-96 max-h-[80vh] overflow-auto">
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              X
            </button>
            <h2 className="text-3xl font-bold mb-4">Enter Amounts:</h2>
            <ul className="space-y-4">
              {recipes[selectedCategory].map((recipe) => (
                <li key={recipe.id} className="flex items-center justify-between">
                  <span className="text-2xl font-semibold">{recipe.name}</span>
                  <input
                    type="number"
                    value={popupAmounts[String(recipe.id)] || 0}
                    onChange={(e) => handlePopupAmountChange(recipe.id, e.target.value)}
                    className="w-20 border border-gray-300 rounded-md p-2 text-sm"
                  />
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleAddOrders}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
