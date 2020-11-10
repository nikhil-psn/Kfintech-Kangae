import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8gSkjgv_AWSclZg7fKApWdbawtvt7_do",
  authDomain: "kfintech-kangae.firebaseapp.com",
  databaseURL: "https://kfintech-kangae.firebaseio.com",
  projectId: "kfintech-kangae",
  storageBucket: "kfintech-kangae.appspot.com",
  messagingSenderId: "620744480499",
  appId: "1:620744480499:web:8fac60809b730e4ccd4986",
  measurementId: "G-68BS3SMVWR",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
