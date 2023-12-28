// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBdIjftb_MPRkUqeI7AE-xlVe0mLVYpdg4",
  authDomain: "blogs-62f05.firebaseapp.com",
  projectId: "blogs-62f05",
  storageBucket: "blogs-62f05.appspot.com",
  messagingSenderId: "108636172422",
  appId: "1:108636172422:web:3d0d8eb05487a38726a107",
  measurementId: "G-JQJKD8V7PQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export {app, auth}