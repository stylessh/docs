import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBn9WNe8Zr6RWJRH9hH_XOMiWlZioE3urY",
  authDomain: "docs-ce63d.firebaseapp.com",
  projectId: "docs-ce63d",
  storageBucket: "docs-ce63d.appspot.com",
  messagingSenderId: "1060073144414",
  appId: "1:1060073144414:web:ed810ce6d6e8dec3ce34cf",
};

// init
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
