import { initializeApp } from "firebase/app"
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEn-EAYtqiMu_MLyhlPEgU5kwN-JaGCdo",
  authDomain: "reactjs-clothing-store.firebaseapp.com",
  projectId: "reactjs-clothing-store",
  storageBucket: "reactjs-clothing-store.firebasestorage.app",
  messagingSenderId: "463134689215",
  appId: "1:463134689215:web:1c0fbf5af999fbd2c1430a",
}

const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: "select_account",
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createAt = new Date()

    try {
      await setDoc(userDocRef, { displayName, email, createAt })
    } catch (error) {
      console.log("error creating the user", error.message)
    }
  }

  return userDocRef
}
