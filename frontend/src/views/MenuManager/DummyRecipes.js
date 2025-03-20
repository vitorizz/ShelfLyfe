const dummyRecipes = {
  Appetizers: [
    {
      id: 1,
      name: "Bruschetta",
      description: "Toasted bread with tomato and basil.",
      ingredients: [
        { id: 1, name: "Tomatoes", units: "pcs", amount: "2" },
        { id: 2, name: "Basil", units: "bunch", amount: "1" },
        { id: 3, name: "Garlic", units: "cloves", amount: "3" },
      ],
    },
    {
      id: 2,
      name: "Stuffed Mushrooms",
      description: "Mushrooms filled with cheese and herbs.",
      ingredients: [
        { id: 4, name: "Mushrooms", units: "pcs", amount: "8" },
        { id: 5, name: "Cream Cheese", units: "oz", amount: "4" },
        { id: 6, name: "Parsley", units: "bunch", amount: "1" },
      ],
    },
  ],
  Mains: [
    {
      id: 3,
      name: "Grilled Salmon",
      description: "Fresh salmon grilled with lemon and herbs.",
      ingredients: [
        { id: 7, name: "Salmon", units: "lbs", amount: "1" },
        { id: 8, name: "Lemon", units: "pcs", amount: "1" },
        { id: 9, name: "Dill", units: "sprigs", amount: "3" },
      ],
    },
    {
      id: 4,
      name: "Chicken Parmesan",
      description: "Breaded chicken breast topped with marinara and cheese.",
      ingredients: [
        { id: 10, name: "Chicken Breast", units: "pcs", amount: "2" },
        { id: 11, name: "Breadcrumbs", units: "cups", amount: "1" },
        { id: 12, name: "Marinara", units: "cups", amount: "1.5" },
      ],
    },
  ],
  Desserts: [
    {
      id: 5,
      name: "Cheesecake",
      description: "Creamy cheesecake with a graham cracker crust.",
      ingredients: [
        { id: 13, name: "Cream Cheese", units: "lbs", amount: "1" },
        { id: 14, name: "Sugar", units: "cups", amount: "0.5" },
        { id: 15, name: "Eggs", units: "pcs", amount: "3" },
      ],
    },
    {
      id: 6,
      name: "Tiramisu",
      description: "Coffee-flavored Italian dessert with mascarpone.",
      ingredients: [
        { id: 16, name: "Mascarpone", units: "lbs", amount: "0.5" },
        { id: 17, name: "Coffee", units: "cups", amount: "1" },
        { id: 18, name: "Ladyfingers", units: "pcs", amount: "20" },
      ],
    },
  ],
};

export default dummyRecipes;
