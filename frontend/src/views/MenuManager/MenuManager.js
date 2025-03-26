import React, { useState, useEffect } from "react";
import { FaUtensils, FaHamburger, FaIceCream } from "react-icons/fa";
import { FiEdit, FiTrash2, FiX } from "react-icons/fi";
import { getAllMenuItems } from "../../api/menu-items";

export default function MenuManager() {
  // State for selected category and recipe details
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recipes, setRecipes] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [newIngredient, setNewIngredient] = useState("");
  const [newIngredientName, setNewIngredientName] = useState("");
  const [newIngredientUnits, setNewIngredientUnits] = useState("");
  const [newIngredientAmount, setNewIngredientAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      try {
        const data = await getAllMenuItems();
        setRecipes(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch recipes: " + err.message);
        console.error("Error fetching recipes:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  });

  // Delete a recipe with confirmation
  const handleDeleteRecipe = (category, recipeId) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      setRecipes((prevRecipes) => ({
        ...prevRecipes,
        [category]: prevRecipes[category].filter(
          (recipe) => recipe.id !== recipeId
        ),
      }));
      if (selectedRecipe && selectedRecipe.id === recipeId) {
        setSelectedRecipe(null);
      }
    }
  };

  // Remove an ingredient from a recipe
  const handleRemoveIngredient = (recipeId, ingredient) => {
    setRecipes((prevRecipes) => ({
      ...prevRecipes,
      [selectedCategory]: prevRecipes[selectedCategory].map((recipe) => {
        if (recipe.id === recipeId) {
          return {
            ...recipe,
            ingredients: recipe.ingredients.filter(
              (item) => item !== ingredient
            ),
          };
        }
        return recipe;
      }),
    }));
    if (selectedRecipe && selectedRecipe.id === recipeId) {
      setSelectedRecipe((prev) => ({
        ...prev,
        ingredients: prev.ingredients.filter((item) => item !== ingredient),
      }));
    }
  };

  // Add a new ingredient to the selected recipe
  const handleAddIngredient = () => {
    if (newIngredient.trim() === "") return;
    setRecipes((prevRecipes) => ({
      ...prevRecipes,
      [selectedCategory]: prevRecipes[selectedCategory].map((recipe) => {
        if (recipe.id === selectedRecipe.id) {
          return {
            ...recipe,
            ingredients: [...recipe.ingredients, newIngredient],
          };
        }
        return recipe;
      }),
    }));
    setSelectedRecipe((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, newIngredient],
    }));
    setNewIngredient("");
  };

  if (isLoading) {
    return <div className="text-center p-8">Loading menu items...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start overflow-hidden p-4">
      <h1 className="text-3xl font-bold mt-4 mb-10">Menu Manager</h1>
      {/* Top category buttons */}
      <div className="flex space-x-20 mb-10">
        <button
          onClick={() => {
            setSelectedCategory("Appetizers");
            setSelectedRecipe(null);
          }}
          className={`flex items-center px-32 py-48 border border-gray-300 rounded-lg text-xl font-semibold shadow-md transition-colors ${
            selectedCategory === "Appetizers"
              ? "bg-blue-100"
              : "bg-white hover:bg-blue-100"
          }`}
        >
          <FaUtensils className="mr-3" size={32} />
          Appetizers
        </button>
        <button
          onClick={() => {
            setSelectedCategory("Mains");
            setSelectedRecipe(null);
          }}
          className={`flex items-center px-32 py-48 border border-gray-300 rounded-lg text-xl font-semibold shadow-md transition-colors ${
            selectedCategory === "Mains"
              ? "bg-blue-100"
              : "bg-white hover:bg-blue-100"
          }`}
        >
          <FaHamburger className="mr-3" size={32} />
          Mains
        </button>
        <button
          onClick={() => {
            setSelectedCategory("Desserts");
            setSelectedRecipe(null);
          }}
          className={`flex items-center px-32 py-48 border border-gray-300 rounded-lg text-xl font-semibold shadow-md transition-colors ${
            selectedCategory === "Desserts"
              ? "bg-blue-100"
              : "bg-white hover:bg-blue-100"
          }`}
        >
          <FaIceCream className="mr-3" size={32} />
          Desserts
        </button>
      </div>

      {/* Recipe list and detail view */}
      {selectedCategory && (
        <div className="w-full flex space-x-10">
          {/* Left column: Recipe list */}
          <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              {selectedCategory} Recipes
            </h2>
            <ul className="space-y-4">
              {recipes[selectedCategory].map((recipe) => (
                <li
                  key={recipe.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="text-lg font-semibold">{recipe.name}</p>
                    <p className="text-gray-500">{recipe.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedRecipe(recipe)}
                      title="Edit"
                    >
                      <FiEdit
                        className="text-green-500 hover:text-green-700"
                        size={20}
                      />
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteRecipe(selectedCategory, recipe.id)
                      }
                      title="Delete"
                    >
                      <FiTrash2
                        className="text-red-500 hover:text-red-700"
                        size={20}
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column: Recipe detail view */}
          <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
            {selectedRecipe ? (
              <>
                <h2 className="text-2xl font-bold mb-4">
                  {selectedRecipe.name}
                </h2>
                <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
                <div className="mt-4 flow-root">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Units
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Amount Needed
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                            >
                              <span className="sr-only">Remove</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {selectedRecipe.ingredients.map((ingredient, idx) => (
                            <tr key={ingredient.id || idx}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                {ingredient.name}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {ingredient.units}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {ingredient.amount}
                              </td>
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                                <button
                                  onClick={() =>
                                    handleRemoveIngredient(
                                      selectedRecipe.id,
                                      ingredient.id
                                    )
                                  }
                                  title="Remove ingredient"
                                >
                                  <FiTrash2
                                    className="text-red-500 hover:text-red-700"
                                    size={16}
                                  />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* New ingredient inputs */}
                <div className="flex items-center space-x-2 mt-4">
                  <input
                    type="text"
                    value={newIngredientName}
                    onChange={(e) => setNewIngredientName(e.target.value)}
                    placeholder="Ingredient Name"
                    className="border p-2 rounded flex-1"
                  />
                  <input
                    type="text"
                    value={newIngredientUnits}
                    onChange={(e) => setNewIngredientUnits(e.target.value)}
                    placeholder="Units"
                    className="border p-2 rounded w-24"
                  />
                  <input
                    type="text"
                    value={newIngredientAmount}
                    onChange={(e) => setNewIngredientAmount(e.target.value)}
                    placeholder="Amount Needed"
                    className="border p-2 rounded w-32"
                  />
                  <button
                    onClick={handleAddIngredient}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </>
            ) : (
              <p className="text-gray-500">Select a recipe to view details</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
