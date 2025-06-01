const meals = [
  {
    id: "sausage_bap_chilli_jam_egg",
    name: "Sausage Bap + Chilli Jam + Fried Egg",
    category: "BREAKFAST",
    components: [
      { type: "ingredient", id: "sausage", quantityGrams: 60 },
      { type: "ingredient", id: "chilli_jam", quantityGrams: 15 },
      { type: "ingredient", id: "egg", quantityGrams: 60 },
      { type: "ingredient", id: "wholemeal_bread", quantityGrams: 80 }
    ]
  },
  {
    id: "protein_pancakes_fruit",
    name: "Protein Pancakes + Banana",
    category: "BREAKFAST",
    components: [
      { type: "recipe", id: "protein_pancakes", quantityGrams: 190 },
      { type: "ingredient", id: "banana", quantityGrams: 60 }
    ]
  },
  {
    id: "beans_on_toast_sausage",
    name: "Beans on Toast + Sausage",
    category: "LUNCH",
    components: [
      { type: "recipe", id: "baked_beans", quantityGrams: 150 },
      { type: "ingredient", id: "wholemeal_bread", quantityGrams: 80 },
      { type: "ingredient", id: "sausage", quantityGrams: 60 }
    ]
  },
  {
    id: "jacket_potato_chilli_cheese",
    name: "Jacket Potato + Beef Chilli + Cheese",
    category: "LUNCH",
    components: [
      { type: "ingredient", id: "large_potato", quantityGrams: 250 },
      { type: "recipe", id: "beef_chilli", quantityGrams: 250 },
      { type: "ingredient", id: "cheddar_cheese", quantityGrams: 20 }
    ]
  },
  {
    id: "ragu_wholemeal_pasta",
    name: "Ragu + Wholemeal Pasta",
    category: "DINNER",
    components: [
      { type: "recipe", id: "ragu", quantityGrams: 300 },
      { type: "ingredient", id: "wholemeal_pasta", quantityGrams: 100 }
    ]
  },
  {
    id: "chicken_fricassee_sweet_potato_peas",
    name: "Chicken Fricassée + Sweet Potato + Peas",
    category: "DINNER",
    components: [
      { type: "recipe", id: "chicken_fricassee", quantityGrams: 300 },
      { type: "ingredient", id: "sweet_potato", quantityGrams: 180 },
      { type: "ingredient", id: "peas", quantityGrams: 80 }
    ]
  },
  {
    id: "snack_protein_yogurt",
    name: "Protein Yogurt + Raspberries",
    category: "SNACK",
    components: [
      { type: "ingredient", id: "protein_yogurt", quantityGrams: 150 },
      { type: "ingredient", id: "raspberries", quantityGrams: 40 }
    ]
  },
  {
    id: "smoothie_banana_choc_protein",
    name: "Smoothie (Banana + Chocolate + Protein)",
    category: "SMOOTHIE",
    components: [
      { type: "ingredient", id: "banana", quantityGrams: 60 },
      { type: "ingredient", id: "greek_yogurt", quantityGrams: 100 },
      { type: "ingredient", id: "whey_protein", quantityGrams: 30 },
      { type: "ingredient", id: "honey", quantityGrams: 10 }
    ]
  }
];

export default meals;
