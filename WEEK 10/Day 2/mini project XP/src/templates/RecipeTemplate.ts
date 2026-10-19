import type { RecipeItem } from '../model/RecipeItem'

export interface RecipeTemplateActions {
  onToggleFavorite: (id: string) => void
  onDelete: (id: string) => void
}

export class RecipeTemplate {
  constructor(
    private readonly container: HTMLElement,
    private readonly actions: RecipeTemplateActions,
  ) {
    this.container.addEventListener('click', this.handleClick)
  }

  render(recipes: RecipeItem[]): void {
    this.container.replaceChildren()

    if (recipes.length === 0) {
      const emptyState = document.createElement('div')
      emptyState.className = 'empty-state'

      const title = document.createElement('h2')
      title.textContent = 'Your recipe book is empty'

      const description = document.createElement('p')
      description.textContent = 'Add a favorite recipe using the form above.'

      emptyState.append(title, description)
      this.container.append(emptyState)
      return
    }

    const fragment = document.createDocumentFragment()
    for (const recipe of recipes) {
      fragment.append(this.createCard(recipe))
    }
    this.container.append(fragment)
  }

  private readonly handleClick = (event: MouseEvent): void => {
    const target = event.target
    if (!(target instanceof Element)) {
      return
    }

    const button = target.closest<HTMLButtonElement>('button[data-action]')
    if (!button || !this.container.contains(button)) {
      return
    }

    const id = button.dataset.recipeId
    if (!id) {
      return
    }

    switch (button.dataset.action) {
      case 'favorite':
        this.actions.onToggleFavorite(id)
        break
      case 'delete':
        this.actions.onDelete(id)
        break
      case 'details': {
        const details = this.container.querySelector<HTMLElement>(
          `#recipe-details-${CSS.escape(id)}`,
        )
        if (!details) {
          return
        }
        const isExpanded = button.getAttribute('aria-expanded') === 'true'
        details.hidden = isExpanded
        button.setAttribute('aria-expanded', String(!isExpanded))
        button.textContent = isExpanded ? 'View details' : 'Hide details'
        break
      }
    }
  }

  private createCard(recipe: RecipeItem): HTMLElement {
    const card = document.createElement('article')
    card.className = 'recipe-card'
    if (recipe.isFavorite) {
      card.classList.add('is-favorite')
    }

    const header = document.createElement('div')
    header.className = 'recipe-card-header'

    const title = document.createElement('h2')
    title.className = 'recipe-title'
    title.textContent = recipe.title

    const favoriteButton = this.createButton(
      recipe.isFavorite ? '★ Favorited' : '☆ Favorite',
      recipe.isFavorite ? 'Unfavorite recipe' : 'Favorite recipe',
      'favorite',
      recipe.id,
    )
    favoriteButton.classList.add('favorite-button')
    favoriteButton.setAttribute('aria-pressed', String(recipe.isFavorite))

    header.append(title, favoriteButton)

    const actions = document.createElement('div')
    actions.className = 'recipe-card-actions'

    const detailsId = `recipe-details-${recipe.id}`
    const detailsButton = this.createButton(
      'View details',
      'Show recipe details',
      'details',
      recipe.id,
    )
    detailsButton.setAttribute('aria-controls', detailsId)
    detailsButton.setAttribute('aria-expanded', 'false')

    const deleteButton = this.createButton(
      'Delete',
      `Delete ${recipe.title}`,
      'delete',
      recipe.id,
    )
    deleteButton.classList.add('delete-button')

    actions.append(detailsButton, deleteButton)
    card.append(header, actions)

    const details = document.createElement('div')
    details.id = detailsId
    details.className = 'recipe-details'
    details.hidden = true

    const ingredientsHeading = document.createElement('h3')
    ingredientsHeading.textContent = 'Ingredients'
    const ingredientsList = document.createElement('ul')
    for (const ingredient of recipe.ingredients) {
      const item = document.createElement('li')
      item.textContent = ingredient
      ingredientsList.append(item)
    }

    const instructionsHeading = document.createElement('h3')
    instructionsHeading.textContent = 'Instructions'
    const instructions = document.createElement('p')
    instructions.className = 'recipe-instructions'
    instructions.textContent = recipe.instructions

    details.append(
      ingredientsHeading,
      ingredientsList,
      instructionsHeading,
      instructions,
    )
    card.append(details)
    return card
  }

  private createButton(
    text: string,
    label: string,
    action: string,
    recipeId: string,
  ): HTMLButtonElement {
    const button = document.createElement('button')
    button.type = 'button'
    button.textContent = text
    button.setAttribute('aria-label', label)
    button.dataset.action = action
    button.dataset.recipeId = recipeId
    return button
  }
}
