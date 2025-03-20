"use client";

export default function IngredientTable({ ingredients, onSelect, selectedId }) {
  return (
    <div className="overflow-auto max-h-[690px]">
      <table className="min-w-full">
        <thead className="sticky top-0 bg-white">
          <tr>
            <th className="w-1/4 px-4 py-2 text-left text-sm font-semibold text-gray-900">Name</th>
            <th className="w-1/4 px-4 py-2 text-left text-sm font-semibold text-gray-900">SKU</th>
            <th className="w-1/4 px-4 py-2 text-left text-sm font-semibold text-gray-900">Stock</th>
            <th className="w-1/4 px-4 py-2 text-left text-sm font-semibold text-gray-900">Price</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-8 text-gray-500">
                No ingredients found
              </td>
            </tr>
          ) : (
            ingredients.map((ingredient) => (
              <tr
                key={ingredient.id}
                onClick={() => onSelect(ingredient)}
                className={`cursor-pointer hover:bg-gray-200 ${selectedId === ingredient.id ? "bg-gray-200" : ""}`}
              >
                <td className="px-4 py-2 font-medium">{ingredient.name}</td>
                <td className="px-4 py-2">{ingredient.sku}</td>
                <td className="px-4 py-2">{ingredient.stock}</td>
                <td className="px-4 py-2">${ingredient.price}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
