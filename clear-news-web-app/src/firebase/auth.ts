import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "./config";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
const auth = getAuth(app);
const db = getFirestore(app);

// Sign up new users
export const SignUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (user) {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          uid: user.uid,
          email: email,
          createAt: new Date(),
          bookmarks: [],
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document to Firestore: ", e);
      }
    }
  } catch (error) {
    console.error("Error signing up: ", error);
  }
};

// Sign in existing users
export const SignIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    console.error("Sign in error", error);
  }
};

// Sign out users
export const LogOut = async () => {
  try {
    await signOut(auth);
    console.log("Log out");
  } catch (error) {
    console.error("Log out error", error);
  }
};
