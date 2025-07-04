import { describe, it, expect } from 'vitest';
import { computeMealMacros, computeRecipeMacros } from './macroUtils.js';

const ingredients = {
  chicken_breast: { macrosPer100g: { calories: 165, protein: 31, carbs: 0, fat: 3.6 } },
  potato: { macrosPer100g: { calories: 77, protein: 2, carbs: 17, fat: 0.1 } }
};

describe('computeRecipeMacros', () => {
  it('calculates total macros and weight', () => {
    const recipe = {
      ingredients: [
        { ingredientId: 'chicken_breast', quantityGrams: 100 },
        { ingredientId: 'potato', quantityGrams: 200 }
      ]
    };
    const { totalMacros, totalWeight } = computeRecipeMacros(recipe, ingredients);
    expect(totalWeight).toBe(300);
    expect(totalMacros.calories).toBeCloseTo(319);
    expect(totalMacros.protein).toBeCloseTo(35);
    expect(totalMacros.carbs).toBeCloseTo(34);
    expect(totalMacros.fat).toBeCloseTo(3.8);
    expect(totalMacros.fibre).toBe(0);
  });
});

describe('computeMealMacros', () => {
  it('computes macros for a meal with scaling', () => {
    const recipe = {
      id: 'mix',
      ingredients: [
        { ingredientId: 'chicken_breast', quantityGrams: 100 },
        { ingredientId: 'potato', quantityGrams: 200 }
      ]
    };
    const recipes = { mix: recipe };
    const meal = {
      components: [
        { type: 'ingredient', id: 'chicken_breast', quantityGrams: 100 },
        { type: 'recipe', id: 'mix', quantityGrams: 300 }
      ]
    };
    const macros = computeMealMacros(meal, ingredients, recipes, 0.5);
    expect(macros.calories).toBeCloseTo(242);
    expect(macros.protein).toBeCloseTo(33);
    expect(macros.carbs).toBeCloseTo(17);
    expect(macros.fat).toBeCloseTo(3.7);
    expect(macros.fibre).toBe(0);
  });

  it('returns zero macros for an empty recipe', () => {
    const emptyRecipe = { id: 'empty', ingredients: [] };
    const recipes = { empty: emptyRecipe };
    const meal = {
      components: [
        { type: 'recipe', id: 'empty', quantityGrams: 100 }
      ]
    };
    const macros = computeMealMacros(meal, ingredients, recipes);
    expect(macros.calories).toBe(0);
    expect(macros.protein).toBe(0);
    expect(macros.carbs).toBe(0);
    expect(macros.fat).toBe(0);
    expect(macros.fibre).toBe(0);
  });

  it('ignores unknown ingredients when computing macros', () => {
    const meal = {
      components: [
        { type: 'ingredient', id: 'mystery_item', quantityGrams: 50 },
        { type: 'ingredient', id: 'chicken_breast', quantityGrams: 100 }
      ]
    };
    const macros = computeMealMacros(meal, ingredients, {});
    expect(macros.calories).toBeCloseTo(165);
    expect(macros.protein).toBeCloseTo(31);
    expect(macros.carbs).toBe(0);
    expect(macros.fat).toBeCloseTo(3.6);
    expect(macros.fibre).toBe(0);
  });
});
