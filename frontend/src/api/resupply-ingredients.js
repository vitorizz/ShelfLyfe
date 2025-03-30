export const resupplyIngredients = async (ingredients) => {
    const payload = ingredients.map(ingredient => ({
      sku: ingredient.sku,
      id: parseInt(ingredient.id),
      isNewIngredient: ingredient.isNewIngredient || false,
      supplier: ingredient.supplier,
      name: ingredient.name,
      stock: parseInt(ingredient.stock) || 0,
      price: parseFloat(ingredient.price) || 0,
      expiryDate: ingredient.expiryDate || "",
      customUnit: ingredient.customUnit || "",
      threshold: parseInt(ingredient.threshold) || 0,
      unit: ingredient.unit || ""
    }));
  
    const response = await fetch("http://localhost:8000/resupply-ingredient-add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.detail || "Failed to resupply ingredients");
    }
  
    return response.json();
  };