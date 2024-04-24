import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import app from './config';

const auth = getAuth(app);

// Sign up new users
export const SignUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error('Sign up error', error);
  }
};

// Sign in existing users
export const SignIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error('Sign in error', error);
  }
};

// Sign out users
export const LogOut = async () => {
  try {
    await signOut(auth);
    console.log('Log out');

  } catch (error) {
    console.error('Log out error', error);
  }
};

