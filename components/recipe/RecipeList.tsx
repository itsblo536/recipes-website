import { Text, SimpleGrid, Container } from "@chakra-ui/react"
import { RecipeWithId } from "../../types"
import RecipeItem from "./RecipeItem"

type Props = {
  readonly recipes: RecipeWithId[]
}

const RecipeList = ({ recipes }: Props) => {
  return (
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
      {recipes.length ? (
        recipes.map((recipe) => <RecipeItem key={recipe.id} recipe={recipe} />)
      ) : (
        <Text>There are no recipes to display!</Text>
      )}
    </SimpleGrid>
  )
}

export default RecipeList