import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import IngredientTable from "./IngredientTable";
import IngredientForm from "./IngredientForm";

export default function IngredientManagement() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8000/get-all-ingredients");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const validUnits = ["individual", "bags", "cartons", "kgs", "bunches"];
        const mapped = data.map((item) => {
          let unit, customUnit;
          if (validUnits.includes(item.stock_measurement)) {
            unit = item.stock_measurement;
            customUnit = "";
          } else {
            unit = "custom";
            customUnit = item.stock_measurement;
            console.log("Custom unit:", customUnit);
          }
          return {
            id: item._id,
            name: item.name,
            sku: item._id,
            stock: item.stock,
            price: item.price,
            threshold: item.warningStockAmount,
            unit,
            customUnit,
            expiryDate: item.expiry_date ? item.expiry_date.split("T")[0] : "",
          };
        });
        setIngredients(mapped);
      } catch (err) {
        setError("Failed to fetch ingredients: " + err.message);
        console.error("Error fetching ingredients:", err);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchIngredients();
  }, []);
  

  const filteredIngredients = ingredients.filter(
    (ingredient) =>
      ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ingredient.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addIngredient = (ingredient) => {
    console.log("Ingredient:", ingredient);
    const payload = {
      sku: ingredient.sku,
      name: ingredient.name,
      stock: ingredient.stock,
      price: ingredient.price,
      threshold: ingredient.threshold,
      unit: ingredient.unit,
      customUnit: ingredient.customUnit,
      expiry_date: ingredient.expiryDate,
    };
    console.log(JSON.stringify(payload));
    fetch("http://localhost:8000/add-ingredient", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add ingredient");
        return res.json();
      })
      .then(() => {
        setIngredients([...ingredients, { ...ingredient, id: ingredient.sku }]);
      })
      .catch((err) => console.error(err));
  };
  

  const updateIngredient = (updatedIngredient) => {
    console.log("Ingredient:", updatedIngredient);
    const payload = {
      sku: updatedIngredient.sku,
      name: updatedIngredient.name,
      stock: updatedIngredient.stock,
      price: updatedIngredient.price,
      threshold: updatedIngredient.threshold,
      unit: updatedIngredient.unit,
      customUnit: updatedIngredient.customUnit,
      expiry_date: updatedIngredient.expiryDate,
    };
    fetch("http://localhost:8000/update-ingredient", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update ingredient");
        return res.json();
      })
      .then(() => {
        setIngredients(
          ingredients.map((ingredient) =>
            ingredient.id === updatedIngredient.id ? updatedIngredient : ingredient
          )
        );
        setSelectedIngredient(updatedIngredient);
      })
      .catch((err) => console.error(err));
  };

  const deleteIngredient = (id) => {
    fetch(`http://localhost:8000/delete-ingredient?sku=${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete ingredient");
        return res.json();
      })
      .then(() => {
        setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
        if (selectedIngredient?.id === id) {
          setSelectedIngredient(null);
        }
      })
      .catch((err) => console.error(err));
  };

  if (isLoading) {
    return <div className="text-center p-8">Loading ingredients...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-4 p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Manage Ingredients</h1>
        <p className="text-gray-500">
          Add, update, or delete ingredients from your inventory.
        </p>
      </div>
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="search"
            placeholder="Search by name or SKU"
            className="pl-8 w-[746px] border rounded-md p-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-gray-200 rounded-md shadow-sm min-h-[690px]">
          <IngredientTable
            ingredients={filteredIngredients}
            onSelect={setSelectedIngredient}
            selectedId={selectedIngredient?.id}
          />
        </div>
        <div className="border border-gray-200 rounded-md shadow-sm">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-semibold">
              {selectedIngredient ? "Edit Ingredient" : "Add New Ingredient"}
            </h2>
            {selectedIngredient && (
              <button
                onClick={() => setSelectedIngredient(null)}
                className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                New Ingredient
              </button>
            )}
          </div>
          <div className="p-4">
            <IngredientForm
              selectedIngredient={selectedIngredient}
              onAdd={addIngredient}
              onUpdate={updateIngredient}
              onDelete={deleteIngredient}
              onCancel={() => setSelectedIngredient(null)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
