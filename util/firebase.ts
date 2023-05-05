import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// signInWithPopup creates a popup to log into Google in a separate window
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import withFirebaseAuth from "react-with-firebase-auth";

// TODO: Replace with your own Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBJ6FXBn4j45bO311b7f7N2XwsNmZHAEfg",
  authDomain: "trends-recipes-website.firebaseapp.com",
  projectId: "trends-recipes-website",
  storageBucket: "trends-recipes-website.appspot.com",
  messagingSenderId: "798921413471",
  appId: "1:798921413471:web:d0b75a67552a5818b21cea"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)

// pass in all providers we want to incorporate into our app
const providers = {
  googleProvider: new GoogleAuthProvider(),

}

// takes in providers and asks to specify auth for app
// enables authentication for components
const createComponentWithAuth = withFirebaseAuth({
  providers,
  firebaseAppAuth: auth,
})

const signInWithGoogle = () => {
  // specify we want to use Google to sign in with this popup
  signInWithPopup(auth, providers.googleProvider)
}

const signOutFirebase = () => {
  signOut(auth)
}

export { db, auth, createComponentWithAuth, signInWithGoogle, signOutFirebase as signOut }