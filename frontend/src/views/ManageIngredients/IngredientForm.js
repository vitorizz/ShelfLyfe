"use client";

import { useState, useEffect } from "react";
import { AlertCircle, Save, Trash, Plus } from "lucide-react";

export default function IngredientForm({
  selectedIngredient,
  onAdd,
  onUpdate,
  onDelete,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    stock: "",       
    price: "",     
    unit: "individual",
    customUnit: "",
    expiryDate: "",
    threshold: "10", 
  });
  const [initialFormData, setInitialFormData] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedIngredient) {
      const data = {
        name: selectedIngredient.name,
        sku: selectedIngredient.sku,
        stock: selectedIngredient.stock,
        price: selectedIngredient.price,
        unit: selectedIngredient.unit || "individual",
        customUnit: selectedIngredient.customUnit || "",
        expiryDate: selectedIngredient.expiryDate || "",
        threshold: selectedIngredient.threshold || 10,
      };
      setFormData(data);
      setInitialFormData(data);
      setErrors({});
    } else {
      const newData = {
        name: "",
        sku: "",
        stock: "",
        price: "",
        unit: "individual",
        customUnit: "",
        expiryDate: "",
        threshold: "10",
      };
      setFormData(newData);
      setInitialFormData(newData);
      setErrors({});
    }
  }, [selectedIngredient]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.sku.trim()) {
      newErrors.sku = "SKU is required";
    }
    if (formData.stock === "" || Number(formData.stock) <= 0) {
      newErrors.stock = "Stock must be greater than 0";
    }
    if (formData.price !== "" && Number(formData.price) < 0) {
      newErrors.price = "Price cannot be negative";
    }
    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    }
    if (formData.threshold !== "" && Number(formData.threshold) < 0) {
      newErrors.threshold = "Threshold cannot be negative";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const submissionData = {
      ...formData,
      stock: Number(formData.stock),
      price: formData.price === "" ? 0 : Number(formData.price),
      threshold: formData.threshold === "" ? 10 : Number(formData.threshold),
    };

    if (selectedIngredient) {
      onUpdate({ ...submissionData, id: selectedIngredient.id });
    } else {
      onAdd(submissionData);
      const resetData = {
        name: "",
        sku: "",
        stock: "",
        price: "",
        unit: "individual",
        customUnit: "",
        expiryDate: "",
        threshold: "10",
      };
      setFormData(resetData);
      setInitialFormData(resetData);
    }
  };

  const handleDelete = () => {
    if (selectedIngredient) {
      onDelete(selectedIngredient.id);
    }
  };

  const isModified = selectedIngredient
    ? JSON.stringify(formData) !== JSON.stringify(initialFormData)
    : true;

  const isAddDisabled =
    !selectedIngredient &&
    (!formData.name.trim() || !formData.sku.trim() || !formData.expiryDate);

  const handleCancel = () => {
    if (!selectedIngredient) {
      const resetData = {
        name: "",
        sku: "",
        stock: "",
        price: "",
        unit: "individual",
        customUnit: "",
        expiryDate: "",
        threshold: "10",
      };
      setFormData(resetData);
      setInitialFormData(resetData);
    }
    onCancel();
  };

  return (
    <div className="border rounded-md shadow-sm">
      <div className="border-b p-4">
        <h2 className="text-lg font-bold">
          {selectedIngredient
            ? `${selectedIngredient.name} Details`
            : "Enter Ingredient Details"}
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              placeholder="Ingredient name"
              onChange={handleChange}
              className={`mt-1 block w-full border rounded-md p-2 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="h-4 w-4" /> {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
              SKU
            </label>
            <input
              id="sku"
              name="sku"
              value={formData.sku}
              placeholder="SKU code"
              onChange={handleChange}
              className={`mt-1 block w-full border rounded-md p-2 ${
                errors.sku ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.sku && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="h-4 w-4" /> {errors.sku}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                value={formData.stock}
                placeholder="0"
                onChange={handleChange}
                className={`mt-1 block w-full border rounded-md p-2 ${
                  errors.stock ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.stock && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" /> {errors.stock}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
                Unit
              </label>
              <select
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2"
              >
                <option value="individual">individual</option>
                <option value="bags">bags</option>
                <option value="bunches">bunches</option>
                <option value="cartons">cartons</option>
                <option value="kgs">kgs</option>
                <option value="custom">custom</option>
              </select>
              {formData.unit === "custom" && (
                <input
                  type="text"
                  name="customUnit"
                  value={formData.customUnit}
                  onChange={handleChange}
                  placeholder="Specify custom unit"
                  className="mt-1 block w-full border rounded-md p-2"
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <p className="text-xs text-gray-500">
              Provide the date in YYYY-MM-DD format.
            </p>
            <input
              id="expiryDate"
              name="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={handleChange}
              className={`mt-1 block w-full border rounded-md p-2 ${
                errors.expiryDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="h-4 w-4" /> {errors.expiryDate}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="threshold" className="block text-sm font-medium text-gray-700">
              Stock Alert Threshold
            </label>
            <p className="text-xs text-gray-500">
              You'll be warned if stock goes below this number.
            </p>
            <input
              id="threshold"
              name="threshold"
              type="number"
              min="0"
              value={formData.threshold}
              placeholder="10"
              onChange={handleChange}
              className={`mt-1 block w-full border rounded-md p-2 ${
                errors.threshold ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.threshold && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="h-4 w-4" /> {errors.threshold}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price ($)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              placeholder="0"
              onChange={handleChange}
              className={`mt-1 block w-full border rounded-md p-2 ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.price && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle className="h-4 w-4" /> {errors.price}
              </p>
            )}
          </div>
        </div>

        <div className="border-t p-4 flex justify-between items-center">
          <div>
            {selectedIngredient && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 flex items-center gap-2"
              >
                <Trash className="h-4 w-4" /> Delete
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={selectedIngredient ? !isModified : isAddDisabled}
              className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                selectedIngredient
                  ? !isModified
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                  : isAddDisabled
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
            >
              {selectedIngredient ? (
                <>
                  <Save className="h-4 w-4" /> Update
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" /> Add
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}