import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'; 
import { auth } from '../config/firebase';


export const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // console.log(user)
      return user;
    } catch (error) {
      throw error;
    }
  };

  export const signUpWithEmail = async ({ email, password}) =>{
    console.log((email, password))
      try {
        const UserCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = UserCredential.user;
    return user
      } catch (error) {
        throw error;
      }
  }
  export const isLoggedIn = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe(); 
            
            if (user) {
                resolve(user); 
            } else {
                resolve(null); 
            }
        });
    });
};