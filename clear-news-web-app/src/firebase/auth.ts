import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "./config";
import { doc, getFirestore, setDoc } from "firebase/firestore";
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
      const userDocRef = doc(db, "users", user.uid);
      try {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: email,
          createAt: new Date(),
        });
        // console.log("Document written with UID: ", user.uid);
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

export const GetUidAndEmail = async () => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const uid = currentUser.uid;
      const email = currentUser.email;

      return { uid, email };
    } else {
      throw new Error("No user is currently signed in");
    }
  } catch (error) {
    console.error("Error getting UID and email:", error);
    throw error;
  }
};
