import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import "firebase/compat/database";

const app = firebase.initializeApp({
    apiKey: "AIzaSyD6SFXdiscwOk-QDTlfaeq6eWLFMGg9BDk",

  authDomain: "lab5-5dafa.firebaseapp.com",

  databaseURL: "https://lab5-5dafa-default-rtdb.europe-west1.firebasedatabase.app/",

  projectId: "lab5-5dafa",

  storageBucket: "lab5-5dafa.appspot.com",

  messagingSenderId: "42916288049",

  appId: "1:42916288049:web:00ffdae34289b5657f2710",

  measurementId: "G-WXFYJTRT8X"
})

export const auth = app.auth()
export const database = app.database()
export default app