import { Card, CardHeader, Heading, CardBody, Stack, StackDivider, Box, CardFooter, Button, Text } from "@chakra-ui/react"
import { collection, deleteDoc, doc } from "firebase/firestore"
import { RecipeWithId } from "../../types"
import { db } from "../../util/firebase"

type Props = {
  readonly recipe: RecipeWithId
}

const RecipeItem = ({ recipe: { id, title, ingredients, cookingTime, instructions } }: Props) => {
  const deleteRecipe = () => {
    const recipeDoc = doc(collection(db, "recipes"), id)
    deleteDoc(recipeDoc)
  }

  return (
    <Card>
      <CardHeader>
        <Heading size='md'> {title} </Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Cooking Time
            </Heading>
            <Text pt='2' fontSize='sm'>
              {cookingTime} minutes to cook
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Ingredients
            </Heading>
            <Text pt='2' fontSize='sm'>
              {ingredients}
            </Text>
          </Box>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Instructions
            </Heading>
            <Text pt='2' fontSize='sm'>
              {instructions}
            </Text>
          </Box>
        </Stack>
      </CardBody>
      <CardFooter>
        <Button onClick={deleteRecipe}>Delete Recipe</Button>
      </CardFooter>
    </Card>
  )
}

export default RecipeItem