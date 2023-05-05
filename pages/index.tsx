import { Button, Heading, Spinner, VStack, Menu, Center } from "@chakra-ui/react"
import { useAuth } from "../components/auth/AuthUserProvider"
import Recipes from "../components/recipe/Recipes"
import Layout from "../components/layout/Layout"
import { signInWithGoogle, signOut } from "../util/firebase"

const RecipesHeading = () => {
  return (
    <Menu>
      <Center>
        <Heading colorScheme="linkedin"> Cooking Recipes </Heading>
      </Center>
    </Menu>
  )
}

const HomePage = () => {
  const { user, loading } = useAuth()
  return (
    <Layout title="Recipes">
      <VStack>
        <RecipesHeading />
        {loading ? <Spinner /> : user ? <Recipes /> : <></>}
        <Button
          _focusVisible={{ shadow: "outline" }}
          _focus={{ shadow: "none" }}
          colorScheme={"messenger"}
          onClick={user ? signOut : signInWithGoogle}
        >
          {user ? "Sign Out" : "Sign In"}
        </Button>
      </VStack>
    </Layout>

  )
}

export default HomePage
