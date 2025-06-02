const ingredients = {
  // Protein
  chicken_breast: {
    id: "chicken_breast",
    name: "Chicken Breast",
    macrosPer100g: { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    category: "Chilled",
    pricePer100g: 1.10
  },
  beef_mince_5: {
    id: "beef_mince_5",
    name: "Beef Mince (5%)",
    macrosPer100g: { calories: 137, protein: 21, carbs: 0, fat: 5 },
    category: "Chilled",
    pricePer100g: 1.20
  },
  pork_sausage: {
    id: "pork_sausage",
    name: "Pork Sausages",
    macrosPer100g: { calories: 301, protein: 12, carbs: 1.7, fat: 27 },
    category: "Chilled",
    pricePer100g: 0.79
  },
  egg: {
    id: "egg",
    name: "Egg",
    macrosPer100g: { calories: 143, protein: 13, carbs: 1.1, fat: 10.3 },
    category: "Chilled",
    pricePer100g: 0.42
  },
  whey_protein: {
    id: "whey_protein",
    name: "Vanilla Whey Protein",
    macrosPer100g: { calories: 390, protein: 78, carbs: 7, fat: 5 },
    category: "Supplements",
    pricePer100g: 1.33
  },
  protein_yogurt: {
    id: "protein_yogurt",
    name: "Protein Yogurt",
    macrosPer100g: { calories: 90, protein: 12, carbs: 6, fat: 0.5 },
    category: "Chilled",
    pricePer100g: 0.25
  },
  greek_yogurt: {
    id: "greek_yogurt",
    name: "Greek Yogurt (0%)",
    macrosPer100g: { calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
    category: "Chilled",
    pricePer100g: 0.16
  },

  // Carbs
  wholemeal_bread: {
    id: "wholemeal_bread",
    name: "Wholemeal Bread",
    macrosPer100g: { calories: 228, protein: 9.5, carbs: 41, fat: 2.2 },
    category: "Food Cupboard",
    pricePer100g: 0.25
  },
  tortilla_wrap: {
    id: "tortilla_wrap",
    name: "Tortilla Wrap",
    macrosPer100g: { calories: 289, protein: 8, carbs: 46, fat: 7.2 },
    category: "Food Cupboard",
    pricePer100g: 0.35
  },
  potato: {
    id: "potato",
    name: "White Potato (Raw)",
    macrosPer100g: { calories: 77, protein: 2, carbs: 17, fat: 0.1 },
    category: "Vegetables",
    pricePer100g: 0.09
  },
  sweet_potato: {
    id: "sweet_potato",
    name: "Sweet Potato (Raw)",
    macrosPer100g: { calories: 86, protein: 1.6, carbs: 20.1, fat: 0.1 },
    category: "Vegetables",
    pricePer100g: 0.18
  },
  wholemeal_pasta: {
    id: "wholemeal_pasta",
    name: "Wholemeal Pasta (Cooked)",
    macrosPer100g: { calories: 124, protein: 5.5, carbs: 25.2, fat: 0.8 },
    category: "Food Cupboard",
    pricePer100g: 0.17
  },
  brown_rice: {
    id: "brown_rice",
    name: "Brown Rice (Cooked)",
    macrosPer100g: { calories: 123, protein: 2.6, carbs: 25.6, fat: 1 },
    category: "Food Cupboard",
    pricePer100g: 0.15
  },
  rolled_oats: {
    id: "rolled_oats",
    name: "Rolled Oats",
    macrosPer100g: { calories: 389, protein: 13, carbs: 66, fat: 7 },
    category: "Food Cupboard",
    pricePer100g: 0.14
  },

  // Veg & Fruit
  broccoli: {
    id: "broccoli",
    name: "Broccoli (Boiled)",
    macrosPer100g: { calories: 35, protein: 2.4, carbs: 7.2, fat: 0.4 },
    category: "Vegetables",
    pricePer100g: 0.21
  },
  peas: {
    id: "peas",
    name: "Peas (Frozen)",
    macrosPer100g: { calories: 81, protein: 5, carbs: 14, fat: 0.4 },
    category: "Frozen",
    pricePer100g: 0.13
  },
  bell_pepper: {
    id: "bell_pepper",
    name: "Bell Pepper",
    macrosPer100g: { calories: 31, protein: 1, carbs: 6, fat: 0.3 },
    category: "Vegetables",
    pricePer100g: 0.45
  },
  onion: {
    id: "onion",
    name: "Onion",
    macrosPer100g: { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1 },
    category: "Vegetables",
    pricePer100g: 0.16
  },
  carrot: {
    id: "carrot",
    name: "Carrot",
    macrosPer100g: { calories: 41, protein: 0.9, carbs: 10, fat: 0.2 },
    category: "Vegetables",
    pricePer100g: 0.12
  },
  banana: {
    id: "banana",
    name: "Banana",
    macrosPer100g: { calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
    category: "Fruit",
    pricePer100g: 0.14
  },
  raspberries: {
    id: "raspberries",
    name: "Raspberries",
    macrosPer100g: { calories: 52, protein: 1.2, carbs: 12, fat: 0.7 },
    category: "Fruit",
    pricePer100g: 1.67
  },

  // Sauces & Extras
  cheddar_cheese: {
    id: "cheddar_cheese",
    name: "Cheddar Cheese",
    macrosPer100g: { calories: 402, protein: 25, carbs: 1.3, fat: 33 },
    category: "Chilled",
    pricePer100g: 0.89
  },
  chilli_jam: {
    id: "chilli_jam",
    name: "Chilli Jam",
    macrosPer100g: { calories: 250, protein: 0, carbs: 60, fat: 0 },
    category: "Food Cupboard",
    pricePer100g: 1.10
  },
  honey: {
    id: "honey",
    name: "Honey",
    macrosPer100g: { calories: 304, protein: 0.3, carbs: 82, fat: 0 },
    category: "Food Cupboard",
    pricePer100g: 0.85
  },
  tomato_passata: {
    id: "tomato_passata",
    name: "Tomato Passata",
    macrosPer100g: { calories: 29, protein: 1.6, carbs: 5.6, fat: 0.2 },
    category: "Food Cupboard",
    pricePer100g: 0.19
  },
  greek_compote: {
    id: "greek_compote",
    name: "Greek Fruit Compote",
    macrosPer100g: { calories: 85, protein: 0.4, carbs: 20, fat: 0 },
    category: "Chilled",
    pricePer100g: 0.68
  }
};

export default ingredients;
