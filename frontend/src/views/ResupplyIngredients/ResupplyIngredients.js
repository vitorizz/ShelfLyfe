"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import ResupplyIngredientTable from "./ResupplyIngredientTable";
import ResupplyIngredientForm from "./ResupplyIngredientForm";
import { resupplyIngredients } from "../../api/resupply-ingredients";

export default function ResupplyIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredIngredients = ingredients.filter(
    (ingredient) =>
      ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ingredient.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ingredient.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddIngredient = (ingredient) => {
    console.log("Adding ingredient:", ingredient);
    const newIngredient = {
      ...ingredient,
      id: Date.now().toString() 
    };
    setIngredients([...ingredients, newIngredient]);
  };

  const handleUpdateIngredient = (updatedIngredient) => {
    console.log("Updating ingredient:", updatedIngredient);
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient.id === updatedIngredient.id
          ? updatedIngredient
          : ingredient
      )
    );
    setSelectedIngredient(updatedIngredient);
  };

  const handleDeleteIngredient = (id) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
    if (selectedIngredient?.id === id) {
      setSelectedIngredient(null);
    }
  };

  const handleConfirmOrder = async () => {
    //console.log("Confirming order with ingredients:", ingredients);
    if (ingredients.length === 0) {
      alert("Please add at least one ingredient before confirming");
      return;
    }
    
    try {
      const result = await resupplyIngredients(ingredients);
      //console.log("Resupply successful:", result);
      //alert("Order confirmed with " + ingredients.length + " ingredients!");
      
      setIngredients([]);
      setSelectedIngredient(null);
    } catch (error) {
      //console.error("Failed to confirm order:", error);
      alert("Failed to confirm order: " + error.message);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Resupply Ingredients</h1>
        <p className="text-gray-500">
          Add supplier ingredients to resupply
        </p>
      </div>
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="search"
            placeholder="Search by supplier name or ingredient name"
            className="pl-8 w-[746px] border rounded-md p-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-gray-200 rounded-md shadow-sm min-h-[690px]">
          <ResupplyIngredientTable
            ingredients={filteredIngredients}
            onSelect={setSelectedIngredient}
            selectedId={selectedIngredient?.id}
          />
          {ingredients.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleConfirmOrder}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Confirm Order
              </button>
            </div>
          )}
        </div>
        <div className="border border-gray-200 rounded-md shadow-sm">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-semibold">
              {selectedIngredient ? "Edit Ingredient" : "Add Supplier Ingredient Pair"}
            </h2>
            {selectedIngredient && (
              <button
                onClick={() => setSelectedIngredient(null)}
                className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                New Supplier Ingredient Pair
              </button>
            )}
          </div>
          <div className="p-4">
            <ResupplyIngredientForm
              selectedIngredient={selectedIngredient}
              onAdd={handleAddIngredient}
              onUpdate={handleUpdateIngredient}
              onDelete={handleDeleteIngredient}
              onCancel={() => setSelectedIngredient(null)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}