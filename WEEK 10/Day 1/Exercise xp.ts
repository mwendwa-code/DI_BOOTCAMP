interface Recipe {
  id: string
  title: string
  image: string
  ingredients: string[]
  instructions: string
}

interface DataState {
  items: unknown[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const mealDbUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function getString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

function parseMealDbRecipes(payload: unknown): Recipe[] {
  if (!isRecord(payload) || !Array.isArray(payload.meals)) {
    throw new Error('The recipe service returned data in an unexpected format.')
  }

  return payload.meals.flatMap((meal): Recipe[] => {
    if (!isRecord(meal)) {
      return []
    }

    const id = getString(meal.idMeal)
    const title = getString(meal.strMeal)
    const image = getString(meal.strMealThumb)
    const instructions = getString(meal.strInstructions)
    if (!id || !title || !image || !instructions) {
      return []
    }

    const ingredients: string[] = []
    for (let index = 1; index <= 20; index += 1) {
      const ingredient = getString(meal[`strIngredient${index}`])
      const measure = getString(meal[`strMeasure${index}`])
      if (ingredient) {
        ingredients.push(measure ? `${measure} ${ingredient}` : ingredient)
      }
    }

    return [{ id, title, image, ingredients, instructions }]
  })
}

function parseSpoonacularRecipes(payload: unknown): Recipe[] {
  if (!isRecord(payload) || !Array.isArray(payload.results)) {
    throw new Error('Spoonacular returned data in an unexpected format.')
  }

  return payload.results.flatMap((result): Recipe[] => {
    if (!isRecord(result)) {
      return []
    }

    const id = result.id
    const title = getString(result.title)
    const image = getString(result.image)
    if (
      (typeof id !== 'number' && typeof id !== 'string') ||
      !title ||
      !image
    ) {
      return []
    }

    const ingredients = Array.isArray(result.extendedIngredients)
      ? result.extendedIngredients.flatMap((item): string[] => {
          if (!isRecord(item)) {
            return []
          }
          const original = getString(item.original)
          return original ? [original] : []
        })
      : []
    const instructions = getString(result.instructions) ?? ''

    return [
      {
        id: String(id),
        title,
        image,
        ingredients,
        instructions: instructions
          .replace(/<[^>]*>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim(),
      },
    ]
  })
}

async function fetchRecipes(
  signal: AbortSignal,
  rapidApiKey?: string,
): Promise<Recipe[]> {
  const apiKey = rapidApiKey?.trim()

  if (apiKey) {
    const response = await fetch(
      'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?number=12&addRecipeInformation=true',
      {
        signal,
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host':
            'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
        },
      },
    )

    if (!response.ok) {
      throw new Error(
        `Spoonacular request failed (${response.status}). Check the RapidAPI key and subscription.`,
      )
    }

    return parseSpoonacularRecipes(await response.json())
  }

  const response = await fetch(mealDbUrl, { signal })
  if (!response.ok) {
    throw new Error(`Recipe request failed with status ${response.status}.`)
  }

  return parseMealDbRecipes(await response.json())
}

function getRecipeSource(rapidApiKey?: string): string {
  return rapidApiKey?.trim()
    ? 'Spoonacular via RapidAPI'
    : 'TheMealDB public demo API'
}

export = { fetchRecipes, getRecipeSource }