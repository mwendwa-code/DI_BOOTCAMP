import { RecipeCollection } from './model/RecipeCollection'
import { RecipeTemplate } from './templates/RecipeTemplate'
import './style.css'

const form = document.querySelector<HTMLFormElement>('#recipeEntryForm')
const titleInput = document.querySelector<HTMLInputElement>('#recipeTitle')
const ingredientsInput = document.querySelector<HTMLTextAreaElement>('#ingredients')
const instructionsInput = document.querySelector<HTMLTextAreaElement>('#instructions')
const recipeContainer = document.querySelector<HTMLDivElement>('#recipeContainer')
const clearRecipesButton =
  document.querySelector<HTMLButtonElement>('#clearRecipesButton')
const message = document.querySelector<HTMLParagraphElement>('#appMessage')

if (
  !form ||
  !titleInput ||
  !ingredientsInput ||
  !instructionsInput ||
  !recipeContainer ||
  !clearRecipesButton ||
  !message
) {
  throw new Error('The recipe app is missing a required element in index.html.')
}

const appMessage = message
const collection = new RecipeCollection()

function showMessage(text: string, isError = false): void {
  appMessage.textContent = text
  appMessage.classList.toggle('is-error', isError)
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'An unexpected error occurred.'
}

const template = new RecipeTemplate(recipeContainer, {
  onToggleFavorite: (id) => {
    try {
      const recipe = collection.toggleFavorite(id)
      template.render(collection.recipes)
      showMessage(
        recipe.isFavorite
          ? `${recipe.title} added to favorites.`
          : `${recipe.title} removed from favorites.`,
      )
    } catch (error: unknown) {
      showMessage(getErrorMessage(error), true)
    }
  },
  onDelete: (id) => {
    const recipe = collection.recipes.find((item) => item.id === id)
    if (!recipe) {
      showMessage('That recipe could not be found.', true)
      return
    }

    try {
      collection.removeRecipe(id)
      template.render(collection.recipes)
      showMessage(`${recipe.title} deleted.`)
    } catch (error: unknown) {
      showMessage(getErrorMessage(error), true)
    }
  },
})

template.render(collection.recipes)

form.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault()

  const title = titleInput.value.trim()
  const ingredients = ingredientsInput.value
    .split(/\r?\n/)
    .map((ingredient) => ingredient.trim())
    .filter((ingredient) => ingredient.length > 0)
  const instructions = instructionsInput.value.trim()

  if (!title || ingredients.length === 0 || !instructions) {
    showMessage(
      'Add a recipe title, at least one ingredient, and cooking instructions.',
      true,
    )
    return
  }

  try {
    const recipe = collection.addRecipe(title, ingredients, instructions)
    template.render(collection.recipes)
    form.reset()
    titleInput.focus()
    showMessage(`${recipe.title} added to your recipe book.`)
  } catch (error: unknown) {
    showMessage(getErrorMessage(error), true)
  }
})

clearRecipesButton.addEventListener('click', () => {
  if (collection.recipes.length === 0) {
    showMessage('Your recipe book is already empty.')
    return
  }

  if (!window.confirm('Clear all recipes? This cannot be undone.')) {
    return
  }

  try {
    collection.clearRecipes()
    template.render(collection.recipes)
    showMessage('All recipes cleared.')
  } catch (error: unknown) {
    showMessage(getErrorMessage(error), true)
  }
})