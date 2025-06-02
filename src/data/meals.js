const meals = [
  // === BREAKFAST ===
  {
    id: "muffin_sausage_egg_cheese",
    name: "Sausage, Egg & Cheese Muffin",
    category: "BREAKFAST",
    components: [
      { type: "ingredient", id: "pork_sausage", quantityGrams: 60 },
      { type: "ingredient", id: "egg", quantityGrams: 60 },
      { type: "ingredient", id: "cheddar_cheese", quantityGrams: 20 },
      { type: "ingredient", id: "wholemeal_bread", quantityGrams: 80 }
    ]
  },
  {
    id: "banana_oat_bake_meal",
    name: "Banana Oat Bake",
    category: "BREAKFAST",
    components: [
      { type: "recipe", id: "banana_oat_bake", quantityGrams: 200 }
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
    id: "breakfast_hash_meal",
    name: "Breakfast Hash + Fried Egg",
    category: "BREAKFAST",
    components: [
      { type: "recipe", id: "breakfast_hash", quantityGrams: 200 },
      { type: "ingredient", id: "egg", quantityGrams: 60 }
    ]
  },
  {
    id: "banana_oat_yogurt",
    name: "Banana + Oats + Yogurt",
    category: "BREAKFAST",
    components: [
      { type: "ingredient", id: "banana", quantityGrams: 60 },
      { type: "ingredient", id: "rolled_oats", quantityGrams: 40 },
      { type: "ingredient", id: "greek_yogurt", quantityGrams: 80 }
    ]
  },

  // === LUNCH ===
  {
    id: "chicken_peas_wrap",
    name: "Chicken Wrap + Peas",
    category: "LUNCH",
    components: [
      { type: "ingredient", id: "chicken_breast", quantityGrams: 120 },
      { type: "ingredient", id: "tortilla_wrap", quantityGrams: 60 },
      { type: "ingredient", id: "peas", quantityGrams: 80 }
    ]
  },
  {
    id: "baked_potato_chilli",
    name: "Jacket Potato + Beef Chilli",
    category: "LUNCH",
    components: [
      { type: "ingredient", id: "potato", quantityGrams: 250 },
      { type: "recipe", id: "beef_chilli", quantityGrams: 250 },
      { type: "ingredient", id: "greek_yogurt", quantityGrams: 50 }
    ]
  },
  {
    id: "chicken_hash_lunch",
    name: "Chicken Hash + Ketchup",
    category: "LUNCH",
    components: [
      { type: "recipe", id: "chicken_hash", quantityGrams: 250 }
    ]
  },
  {
    id: "rice_veg_bowl",
    name: "Mixed Veg & Rice Bowl",
    category: "LUNCH",
    components: [
      { type: "recipe", id: "veggie_rice", quantityGrams: 250 }
    ]
  },
  {
    id: "wrap_chilli_fill",
    name: "Chilli Wrap + Cheese",
    category: "LUNCH",
    components: [
      { type: "recipe", id: "chilli_wrap_fill", quantityGrams: 200 },
      { type: "ingredient", id: "tortilla_wrap", quantityGrams: 60 },
      { type: "ingredient", id: "cheddar_cheese", quantityGrams: 20 }
    ]
  },
  {
    id: "egg_mayo_sandwich",
    name: "Egg Mayo Sandwich",
    category: "LUNCH",
    components: [
      { type: "recipe", id: "egg_mayo", quantityGrams: 120 },
      { type: "ingredient", id: "wholemeal_bread", quantityGrams: 80 }
    ]
  },

  // === DINNER ===
  {
    id: "pasta_cheesy_marinara",
    name: "Wholemeal Pasta + Creamy Marinara",
    category: "DINNER",
    components: [
      { type: "ingredient", id: "wholemeal_pasta", quantityGrams: 200 },
      { type: "recipe", id: "creamy_marinara", quantityGrams: 150 }
    ]
  },
  {
    id: "pasta_cheese_sauce",
    name: "Wholemeal Pasta + Cheese Sauce",
    category: "DINNER",
    components: [
      { type: "ingredient", id: "wholemeal_pasta", quantityGrams: 200 },
      { type: "recipe", id: "cheese_sauce_pasta", quantityGrams: 100 }
    ]
  },
  {
    id: "chicken_bake_meal",
    name: "Chicken & Sweet Potato Bake",
    category: "DINNER",
    components: [
      { type: "recipe", id: "chicken_bake", quantityGrams: 250 }
    ]
  },
  {
    id: "rice_pepper_bowl",
    name: "Tomato & Pepper Rice Bowl",
    category: "DINNER",
    components: [
      { type: "recipe", id: "tomato_pepper_rice", quantityGrams: 250 }
    ]
  },
  {
    id: "cheesy_mash_dinner",
    name: "Cheesy Mash + Sausage",
    category: "DINNER",
    components: [
      { type: "recipe", id: "cheesy_mash", quantityGrams: 200 },
      { type: "ingredient", id: "pork_sausage", quantityGrams: 60 }
    ]
  },

  // === SNACK ===
  {
    id: "snack_yogurt_pot",
    name: "Protein Yogurt + Raspberries + Honey",
    category: "SNACK",
    components: [
      { type: "recipe", id: "raspberry_yogurt_pot", quantityGrams: 200 }
    ]
  },
  {
    id: "snack_yogurt_raspberries",
    name: "Greek Yogurt + Raspberries",
    category: "SNACK",
    components: [
      { type: "ingredient", id: "greek_yogurt", quantityGrams: 120 },
      { type: "ingredient", id: "raspberries", quantityGrams: 40 }
    ]
  },
  {
    id: "snack_cheddar_bread",
    name: "Cheddar + Wholemeal Bread",
    category: "SNACK",
    components: [
      { type: "ingredient", id: "cheddar_cheese", quantityGrams: 30 },
      { type: "ingredient", id: "wholemeal_bread", quantityGrams: 60 }
    ]
  },
  {
    id: "snack_honey_oats",
    name: "Honey + Rolled Oats",
    category: "SNACK",
    components: [
      { type: "ingredient", id: "honey", quantityGrams: 15 },
      { type: "ingredient", id: "rolled_oats", quantityGrams: 40 }
    ]
  },
  {
    id: "snack_egg_cheese",
    name: "Boiled Egg + Cheese",
    category: "SNACK",
    components: [
      { type: "ingredient", id: "egg", quantityGrams: 60 },
      { type: "ingredient", id: "cheddar_cheese", quantityGrams: 20 }
    ]
  },
  {
    id: "snack_peanut_banana",
    name: "Banana + Honey",
    category: "SNACK",
    components: [
      { type: "ingredient", id: "banana", quantityGrams: 80 },
      { type: "ingredient", id: "honey", quantityGrams: 10 }
    ]
  },
  {
    id: "snack_bread_jam",
    name: "Wholemeal Bread + Chilli Jam",
    category: "SNACK",
    components: [
      { type: "ingredient", id: "wholemeal_bread", quantityGrams: 60 },
      { type: "ingredient", id: "chilli_jam", quantityGrams: 15 }
    ]
  },
  {
    id: "snack_protein_yogurt_plain",
    name: "Protein Yogurt (Plain)",
    category: "SNACK",
    components: [
      { type: "ingredient", id: "protein_yogurt", quantityGrams: 150 }
    ]
  },
  {
    id: "snack_cheese_pepper",
    name: "Cheddar Cheese + Bell Pepper",
    category: "SNACK",
    components: [
      { type: "ingredient", id: "cheddar_cheese", quantityGrams: 30 },
      { type: "ingredient", id: "bell_pepper", quantityGrams: 60 }
    ]
  },
  {
    id: "snack_yogurt_compote",
    name: "Greek Yogurt + Fruit Compote",
    category: "SNACK",
    components: [
      { type: "ingredient", id: "greek_yogurt", quantityGrams: 100 },
      { type: "ingredient", id: "greek_compote", quantityGrams: 40 }
    ]
  },

  // === SMOOTHIE ===
  {
    id: "banana_protein_smoothie",
    name: "Banana Protein Smoothie",
    category: "SMOOTHIE",
    components: [
      { type: "ingredient", id: "banana", quantityGrams: 60 },
      { type: "ingredient", id: "greek_yogurt", quantityGrams: 100 },
      { type: "ingredient", id: "whey_protein", quantityGrams: 30 },
      { type: "ingredient", id: "honey", quantityGrams: 10 }
    ]
  },
  {
    id: "berry_smoothie",
    name: "Raspberry Yogurt Smoothie",
    category: "SMOOTHIE",
    components: [
      { type: "ingredient", id: "raspberries", quantityGrams: 60 },
      { type: "ingredient", id: "greek_yogurt", quantityGrams: 120 },
      { type: "ingredient", id: "whey_protein", quantityGrams: 20 }
    ]
  },
  {
    id: "banana_oat_smoothie",
    name: "Banana Oat Smoothie",
    category: "SMOOTHIE",
    components: [
      { type: "ingredient", id: "banana", quantityGrams: 60 },
      { type: "ingredient", id: "rolled_oats", quantityGrams: 40 },
      { type: "ingredient", id: "greek_yogurt", quantityGrams: 120 }
    ]
  },
  {
    id: "tropical_protein_smoothie",
    name: "Tropical Smoothie (Banana + Raspberry + Honey)",
    category: "SMOOTHIE",
    components: [
      { type: "ingredient", id: "banana", quantityGrams: 50 },
      { type: "ingredient", id: "raspberries", quantityGrams: 50 },
      { type: "ingredient", id: "greek_yogurt", quantityGrams: 100 },
      { type: "ingredient", id: "whey_protein", quantityGrams: 25 }
    ]
  },
  {
    id: "plain_protein_shake",
    name: "Plain Protein Shake",
    category: "SMOOTHIE",
    components: [
      { type: "ingredient", id: "whey_protein", quantityGrams: 35 },
      { type: "ingredient", id: "greek_yogurt", quantityGrams: 120 }
    ]
  }
];

export default meals;
