// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDn8o_CWlgsNE2vJeLy7OB6HFN1q7b8_hA",
  authDomain: "tuongtacnguoimay-912e8.firebaseapp.com",
  projectId: "tuongtacnguoimay-912e8",
  storageBucket: "tuongtacnguoimay-912e8.appspot.com",
  messagingSenderId: "292868906403",
  appId: "1:292868906403:web:18c93ca63a6136b72c0e16",
  measurementId: "G-PG3RG9GB6J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
export default app;
