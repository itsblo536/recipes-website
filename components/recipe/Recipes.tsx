import { Spinner } from "@chakra-ui/react"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Recipe, RecipeWithId } from "../../types"
import { db } from "../../util/firebase"
import { useAuth } from "../auth/AuthUserProvider"
import RecipeAdd from "./RecipeAdd"
import RecipeList from "./RecipeList"

const Recipes = () => {
  const [recipes, setRecipes] = useState<RecipeWithId[] | null>(null)

  const { user } = useAuth()

  const recipyQuery = query(
    collection(db, "recipes"),
    where("owner", "==", user!.email!)
  )

  useEffect(() => {
    const unsubscribe = onSnapshot(recipyQuery, (querySnapshot) => {
      const snapshotRecipes: RecipeWithId[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as Recipe
        return { ...data, id: doc.id }
      })
      setRecipes(snapshotRecipes)
    })
    return unsubscribe
  }, [])

  return (
    <>
      {recipes ? (
        <>
          <RecipeAdd />
          <RecipeList recipes={recipes} />
        </>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default Recipes