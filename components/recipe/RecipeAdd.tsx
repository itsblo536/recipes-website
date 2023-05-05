import { Button, Input, Stack, InputGroup, } from "@chakra-ui/react"
import { addDoc, collection } from "firebase/firestore"
import { FormEventHandler, useState } from "react"
import { Recipe } from "../../types"
import { db } from "../../util/firebase"
import { useAuth } from "../auth/AuthUserProvider"

const RecipeAdd = () => {
  const [title, setTitle] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [cookingTime, setCookingTime] = useState("")
  const [instructions, setInstructions] = useState("")
  const { user } = useAuth()

  const addRecipe: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (title == "" || ingredients == "" || cookingTime == "" || instructions == "") return
    const recipe: Recipe = {
      title: title,
      ingredients: ingredients,
      cookingTime: cookingTime,
      instructions: instructions,
      owner: user!.email!
    }
    addDoc(collection(db, "recipes"), recipe)
    setTitle("")
    setIngredients("")
    setCookingTime("")
    setInstructions("")
  }

  return (
    <form onSubmit={addRecipe}>
      <Stack spacing={4}>
        <InputGroup>
          <Input
            value={title}
            type="text"
            placeholder="Recipe Name"
            onChange={(e) => setTitle(e.target.value)} />
        </InputGroup>

        <InputGroup>
          <Input
            value={cookingTime}
            type="number"
            placeholder="Cooking Time (in minutes)"
            onChange={(e) => setCookingTime(e.target.value)} />
        </InputGroup>

        <InputGroup>
          <Input
            value={ingredients}
            type="text"
            placeholder="Recipe Ingredients"
            onChange={(e) => setIngredients(e.target.value)} />
        </InputGroup>

        <InputGroup>
          <Input
            value={instructions}
            type="text"
            placeholder="Recipe Instructions"
            onChange={(e) => setInstructions(e.target.value)}
            size="lg" />
        </InputGroup>

        <Button type="submit">Add Recipe</Button>
      </Stack>
    </form>
  )
}

export default RecipeAdd