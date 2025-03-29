"use client";

export default function ResupplyIngredientTable({ ingredients, onSelect, selectedId }) {
  return (
    <div className="overflow-auto max-h-[690px]">
      <table className="min-w-full">
        <thead className="sticky top-0 bg-white">
          <tr>
            <th className="w-1/5 px-4 py-2 text-left text-sm font-semibold text-gray-900">Supplier</th>
            <th className="w-1/5 px-4 py-2 text-left text-sm font-semibold text-gray-900">Ingredient</th>
            <th className="w-1/5 px-4 py-2 text-left text-sm font-semibold text-gray-900">SKU</th>
            <th className="w-1/5 px-4 py-2 text-left text-sm font-semibold text-gray-900">Stock</th>
            <th className="w-1/5 px-4 py-2 text-left text-sm font-semibold text-gray-900">Price</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-8 text-gray-500">
                Add supplier ingredients to resupply
              </td>
            </tr>
          ) : (
            ingredients.map((ingredient) => (
              <tr
                key={ingredient.id}
                onClick={() => onSelect(ingredient)}
                className={`cursor-pointer hover:bg-gray-200 ${selectedId === ingredient.id ? "bg-gray-200" : ""}`}
              >
                <td className="px-4 py-2 font-medium">{ingredient.supplier}</td>
                <td className="px-4 py-2">
                  {ingredient.isNewIngredient ? 
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">New</span> : 
                    ingredient.name}
                </td>
                <td className="px-4 py-2">{ingredient.sku}</td>
                <td className="px-4 py-2">{ingredient.stock} {ingredient.unit === "custom" ? ingredient.customUnit : ingredient.unit}</td>
                <td className="px-4 py-2">${ingredient.price}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}