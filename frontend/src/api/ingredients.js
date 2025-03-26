export const getAllIngredients = async () => {
  try {
    const response = await fetch("http://localhost:8000/get-all-ingredients");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const addIngredient = async (ingredient) => {
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

  const response = await fetch("http://localhost:8000/add-ingredient", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to add ingredient");
  }

  return response.json();
};

export const updateIngredientAPI = async (updatedIngredient) => {
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

  const response = await fetch("http://localhost:8000/update-ingredient", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update ingredient");
  }
  return await response.json();
};

export const deleteIngredientAPI = async (id) => {
  const response = await fetch(
    `http://localhost:8000/delete-ingredient?sku=${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete ingredient");
  }
  return await response.json();
};
