import { RecipeItem, type RecipeData } from './RecipeItem'

const STORAGE_KEY = 'recipe-book.recipes'

function isRecipeData(value: unknown): value is RecipeData {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const data = value as Record<string, unknown>
  return (
    typeof data.id === 'string' &&
    typeof data.title === 'string' &&
    Array.isArray(data.ingredients) &&
    data.ingredients.every((ingredient: unknown) => typeof ingredient === 'string') &&
    typeof data.instructions === 'string' &&
    typeof data.isFavorite === 'boolean'
  )
}

export class RecipeCollection {
  private items: RecipeItem[]

  constructor() {
    this.items = this.loadFromLocalStorage()
  }

  get recipes(): RecipeItem[] {
    return [...this.items]
  }

  addRecipe(title: string, ingredients: string[], instructions: string): RecipeItem {
    const recipe = new RecipeItem(title, ingredients, instructions)
    this.commit([...this.items, recipe])
    return recipe
  }

  removeRecipe(id: string): void {
    const nextItems = this.items.filter((recipe) => recipe.id !== id)
    if (nextItems.length === this.items.length) {
      throw new Error('Recipe not found.')
    }
    this.commit(nextItems)
  }

  toggleFavorite(id: string): RecipeItem {
    const recipe = this.items.find((item) => item.id === id)
    if (!recipe) {
      throw new Error('Recipe not found.')
    }

    const updatedRecipe = RecipeItem.fromData({
      ...recipe,
      isFavorite: !recipe.isFavorite,
    })
    this.commit(
      this.items.map((item) => (item.id === id ? updatedRecipe : item)),
    )
    return updatedRecipe
  }

  clearRecipes(): void {
    this.commit([])
  }

  saveToLocalStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
    } catch (error: unknown) {
      throw new Error('Could not save recipes to local storage.', {
        cause: error,
      })
    }
  }

  loadFromLocalStorage(): RecipeItem[] {
    let serializedRecipes: string | null
    try {
      serializedRecipes = localStorage.getItem(STORAGE_KEY)
    } catch (error: unknown) {
      throw new Error('Could not read recipes from local storage.', {
        cause: error,
      })
    }

    if (serializedRecipes === null) {
      return []
    }

    let parsed: unknown
    try {
      parsed = JSON.parse(serializedRecipes)
    } catch (error: unknown) {
      throw new Error('Saved recipes contain invalid JSON.', { cause: error })
    }

    if (!Array.isArray(parsed) || !parsed.every(isRecipeData)) {
      throw new Error('Saved recipes have an unexpected data format.')
    }

    return parsed.map((recipe) => RecipeItem.fromData(recipe))
  }

  private commit(nextItems: RecipeItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems))
    } catch (error: unknown) {
      throw new Error('Could not save recipes to local storage.', {
        cause: error,
      })
    }
    this.items = nextItems
  }
}
