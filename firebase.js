import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwgBp-OFwTf4BTDhIneoLe90hZFO6rN18",
  authDomain: "chainmint-5b5fe.firebaseapp.com",
  projectId: "chainmint-5b5fe",
  storageBucket: "chainmint-5b5fe.appspot.com",
  messagingSenderId: "368997124563",
  appId: "1:368997124563:web:2a387f8ae91050ad92c726",
  measurementId: "G-HGZ1KMSVLK",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
