import { useState } from 'react'
import { fetchRecipes, recipeSource } from './api/api'
import { DataFetcher } from './components/DataFetcher'
import type { Recipe } from './types/types'

interface AppSettings {
  readonly VITE_RAPIDAPI_KEY?: string
}

interface AppImportMeta extends ImportMeta {
  readonly env: AppSettings
}

const environment = (import.meta as AppImportMeta).env

function isRecipe(value: unknown): value is Recipe {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const recipe = value as Record<string, unknown>
  return (
    typeof recipe.id === 'string' &&
    typeof recipe.title === 'string' &&
    typeof recipe.image === 'string' &&
    Array.isArray(recipe.ingredients) &&
    recipe.ingredients.every(
      (ingredient: unknown) => typeof ingredient === 'string',
    ) &&
    typeof recipe.instructions === 'string'
  )
}

function App() {
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null)

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Recipe Explorer home">
          <span className="brand-mark">R</span>
          <span>Recipe Explorer</span>
        </a>
        <span className="course-tag">REACT · TYPESCRIPT · REDUX</span>
      </header>

      <section className="hero">
        <p className="hero-kicker">
          <span className="status-dot" /> GENERIC DATA FETCHING
        </p>
        <h1>
          Find something
          <br />
          <span>good to cook.</span>
        </h1>
        <p className="hero-copy">
          Recipes fetched from a live API, rendered by one reusable typed
          component, with loading and error state managed in Redux.
        </p>
        <div className="topic-pills" aria-label="Technologies">
          <span>TypeScript generics</span>
          <span>React hooks</span>
          <span>Redux Toolkit</span>
        </div>
      </section>

      <section className="content-panel">
        <div className="toolbar">
          <div>
            <p className="eyebrow">THE COLLECTION</p>
            <h2>Recipe ideas</h2>
          </div>
        </div>

        <p className="source-note">
          Data source: {recipeSource}
          {!environment.VITE_RAPIDAPI_KEY &&
            ' · Add VITE_RAPIDAPI_KEY to .env.local to use Spoonacular via RapidAPI.'}
        </p>

        <DataFetcher<Recipe>
          title="Recipes to explore"
          fetchData={fetchRecipes}
          isItem={isRecipe}
          getKey={(recipe) => recipe.id}
          renderItem={(recipe) => {
            const isExpanded = expandedRecipe === recipe.id
            return (
              <>
                <img
                  className="recipe-image"
                  src={recipe.image}
                  alt=""
                  loading="lazy"
                />
                <div className="recipe-card-body">
                  <h3>{recipe.title}</h3>
                  <div className="recipe-meta">
                    <span>{recipe.ingredients.length} ingredients</span>
                    <button
                      type="button"
                      className="text-button"
                      aria-expanded={isExpanded}
                      onClick={() =>
                        setExpandedRecipe(isExpanded ? null : recipe.id)
                      }
                    >
                      {isExpanded ? 'Close details' : 'View details'}
                    </button>
                  </div>
                  {isExpanded && (
                    <div className="recipe-details">
                      {recipe.ingredients.length > 0 && (
                        <>
                          <h4>Ingredients</h4>
                          <ul>
                            {recipe.ingredients.map((ingredient) => (
                              <li key={ingredient}>{ingredient}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      {recipe.instructions && (
                        <>
                          <h4>Instructions</h4>
                          <p>{recipe.instructions}</p>
                        </>
                      )}
                      {!recipe.ingredients.length && !recipe.instructions && (
                        <p>
                          Full recipe details are not available from this source.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </>
            )
          }}
        />
      </section>

      <footer className="page-footer">
        <span>Reusable components, strongly typed data.</span>
        <span>API status and results are managed with Redux.</span>
      </footer>
    </main>
  )
}

export default App
