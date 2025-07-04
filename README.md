# 🥗 Meal Planner App

**Version:** Alpha  
**Status:** Actively Developed  
**Repository:** [MealPlannerApp](https://github.com/LJGardiner/MealPlannerApp)

---

## 📌 Project Goals

The Meal Planner App is a modular, client-side web tool for nutritional planning. It allows users to:
- Create ingredients with macros and prices
- Build recipes and meals from ingredients
- Assign meals to weekly planner slots
- Set and track daily macro targets
- Automatically generate meal plans
- Generate categorized shopping lists

It is optimized for performance, maintainability, and a polished UI/UX using Tailwind CSS and modern React standards.

---

## 🧠 Project Philosophy

- **Data-Driven Planning:** Every input (ingredient, recipe, meal) carries gram-based macros and price.
- **User Control First:** Manual planning supported from day one, automation added incrementally.
- **Visual Feedback:** Macro totals, gaps, and overages are clearly displayed.
- **Client-Side Persistence:** All user data is stored via `localStorage`.
- **Trackable Progress:** Development is organized using `roadmap`.

---

## 🧭 Project Structure

Located in `/src`:

```
/src
│
├── /app/           # Core feature modules (ingredients, recipes, meals, planner)
├── /components/    # UI components (stateless where possible)
├── /data/          # Static data state files (JSON-formatted JS)
├── /utils/         # Logic utilities (macros, storage, shopping)
│
├── App.jsx         # Main app container
├── main.jsx        # React entry point
└── index.html      # HTML shell
```

---

## 📊 Data Format Reference

All data is in grams for consistency.

### Ingredient
```js
{
  id: "chicken_breast",
  name: "Chicken Breast",
  macrosPer100g: { calories, protein, carbs, fat, fibre },
  pricePer100g: 0.45,
  category: "Chilled"
}
```

### Recipe
```js
{
  id: 1,
  name: "Beef Chilli",
  components: [{ ingredientId, quantityGrams }]
}
```

### Meal
```js
{
  id: 10,
  name: "Chilli Jacket Potato",
  category: "Dinner",
  components: [{ recipeId or ingredientId, quantityGrams }]
}
```

### Planner
```js
{
  Monday: {
    Breakfast: { mealId, portion },
    ...
  }
}
```

### Macro Targets
```js
{
  Monday: {
    calories, protein, carbs, fat, fibre
  }
}
```

---

## 💻 Development & Setup

### 🔧 Installation
```bash
git clone https://github.com/LJGardiner/MealPlannerApp.git
cd MealPlannerApp
npm install
npm run dev
```

### 🛠 Dependencies
- React 18+
- TailwindCSS (via PostCSS pipeline)
- `shadcn/ui` for base components
- `lucide-react` for icons
- `recharts` for macro visualizations

---

## 🎨 UI Conventions

Defined in [`style_guide`](./documentation/style_guide):

- Consistent Tailwind-based spacing, typography, and themes
- Responsive layout with light/dark mode support
- Button, form, and modal patterns standardized via component library
- Macro data visualized via charts and badges (green/yellow/red)

---

## 📅 Project Roadmap & Status

Development is tracked in [`roadmap`](./documentation/roadmap), organized by phase and task codes. Tasks are marked as ✅ when complete and 🔄 when active.

Phases include:
1. Setup (✅)
2. Core Builders (✅)
3. Weekly Planner (✅)
4. Macro Goals & Shopping (✅)
5. UI Polish & Theme (🔄)
6. Unit Testing (🧪)
7. External Integrations (🔌)
8. Utility Operations (♻️)

---

## 🧪 Developer Notes

- Use snake_case for all IDs
- Use strict grams (not units) for quantities
- All UI updates are state-driven via React hooks
- Planned future support for user authentication and backend syncing

---

## 🤝 Contributing

Contributions welcome! Fork, feature branch, and submit a PR. Ensure all PRs:
- Use consistent code style
- Include explanatory commit messages
- Maintain compatibility with `localStorage` data model

---

## 📄 License

MIT License. See `LICENSE.md` for full terms.
