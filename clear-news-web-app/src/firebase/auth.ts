import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import app from './config';

const auth = getAuth(app);

// Sign up new users
const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error('Sign up error', error);
  }
};

// Sign in existing users
const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error('Sign in error', error);
  }
};

// Sign out users
const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Log out error', error);
  }
};

export { signUp, signIn, logOut };
