export interface Recipe {
  id: string
  title: string
  image: string
  ingredients: string[]
  instructions: string
}

export interface DataState {
  items: unknown[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}