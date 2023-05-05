export type Recipe = {
  title: string
  ingredients: string
  cookingTime: string
  instructions: string
  owner: string
}

export type RecipeWithId = Recipe & {
  id: string
}