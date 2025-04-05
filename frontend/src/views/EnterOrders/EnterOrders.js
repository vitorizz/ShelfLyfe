import React, { useState, useEffect } from "react";
import { FaUtensils, FaHamburger, FaIceCream } from "react-icons/fa";
import { getAllMenuItems } from "../../api/menu-items"; // Reuse the recipe API

export default function EnterOrders() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recipes, setRecipes] = useState({}); // Grouped recipes by category
  const [orderCounts, setOrderCounts] = useState({}); // Maps recipe.id -> { name, count }
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // When a recipe is clicked, update its order count
  const handleRecipeClick = (recipe) => {
    setOrderCounts((prevOrders) => {
      const updatedOrders = { ...prevOrders };
      if (updatedOrders[recipe.id]) {
        updatedOrders[recipe.id].count += 1;
      } else {
        updatedOrders[recipe.id] = { name: recipe.name, count: 1 };
      }
      return updatedOrders;
    });
  };

  if (isLoading) {
    return <div className="text-center p-8">Loading recipes...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start overflow-hidden p-4">
      <h1 className="text-3xl font-bold mt-4 mb-10">Enter Orders</h1>
      
      {/* Top Category Buttons */}
      <div className="flex space-x-20 mb-10">
        <button
          onClick={() => {
            setSelectedCategory("Appetizers");
          }}
          className={`flex items-center px-32 py-48 border border-gray-300 rounded-lg text-xl font-semibold shadow-md transition-colors ${
            selectedCategory === "Appetizers" ? "bg-blue-100" : "bg-white hover:bg-blue-100"
          }`}
        >
          <FaUtensils className="mr-3" size={32} />
          Appetizers
        </button>
        <button
          onClick={() => {
            setSelectedCategory("Mains");
          }}
          className={`flex items-center px-32 py-48 border border-gray-300 rounded-lg text-xl font-semibold shadow-md transition-colors ${
            selectedCategory === "Mains" ? "bg-blue-100" : "bg-white hover:bg-blue-100"
          }`}
        >
          <FaHamburger className="mr-3" size={32} />
          Mains
        </button>
        <button
          onClick={() => {
            setSelectedCategory("Desserts");
          }}
          className={`flex items-center px-32 py-48 border border-gray-300 rounded-lg text-xl font-semibold shadow-md transition-colors ${
            selectedCategory === "Desserts" ? "bg-blue-100" : "bg-white hover:bg-blue-100"
          }`}
        >
          <FaIceCream className="mr-3" size={32} />
          Desserts
        </button>
      </div>

      {/* Recipe List & Order Count View */}
      {selectedCategory && recipes[selectedCategory] && (
        <div className="w-full flex space-x-10">
          {/* Left Column: Recipe List */}
          <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">{selectedCategory}</h2>
            <ul className="space-y-4">
              {recipes[selectedCategory].map((recipe) => (
                <li
                  key={recipe.id}
                  onClick={() => handleRecipeClick(recipe)}
                  className="cursor-pointer border border-gray-300 rounded-md p-4 hover:bg-blue-50 transition-colors"
                >
                  <p className="text-xl font-semibold mb-1">{recipe.name}</p>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Right Column: Order Count Box */}
          <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
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
                No orders yet. Click a recipe to add orders.
              </p>
            )}
          </div>
          
        </div>
      )}
      {/*"Enter Today's Orders" Button */}
      {selectedCategory && (
        <div className="mt-8 flex w-full justify-end">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg">
                Enter Orders
            </button>
        </div>
      )}
    </div>
  );
}
