import { User } from "firebase/auth"
// create authContext so every component in our app can use auth
// useContext is used to enforce this
import { createContext, useContext, FC } from "react"
import { WrappedComponentProps } from "react-with-firebase-auth"
import { createComponentWithAuth } from "../../util/firebase"

// goal of this component is to: 
// create wrapper around our whole app to allow all components to access authentication, content of our user

// the instance of whether or not a user is logged in
// is this user authenticated / logged in. If they are, they are of user type; if not, they are of type null
type AuthData = Omit<WrappedComponentProps, "user"> & {
  user?: User | null
}

// when we initialize create AuthUserContext, it is undefined b/c we have no users logged in
const AuthUserContext = createContext<AuthData | undefined>(undefined)

// our wrapper around our entire web app - enabling context of all authentication in our web app
// the children we're referencing is all of the child components we will put inside our wrapper
// auth is our auth instance for our app
const AuthUserProvider: FC<WrappedComponentProps> = ({ children, ...auth }) => {
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  )
}

// providing the ability to pull information from wherever
export default createComponentWithAuth(AuthUserProvider)

// allowing us to actually get user information from our AuthUserContext
// pulling user information, but if there's no context / authentication data, then AuthUserContext will be null
// context contains information about our user - whether or not they're authenticated
export const useAuth = () => {
  const context = useContext(AuthUserContext)
  if (!context) throw new Error("AuthUserContext has no value")
  return context;
}