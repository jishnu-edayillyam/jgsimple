import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyA7irUKknFsBhhz_bFrO03-YYQ_wu2oKOE",
  authDomain: "jgsimple-53b92.firebaseapp.com",
  projectId: "jgsimple-53b92",
  storageBucket: "jgsimple-53b92.appspot.com",
  messagingSenderId: "5302007559",
  appId: "1:5302007559:web:10333f3d35cc63aab4b7a2",
};

const firebaseApp = initializeApp(firebaseConfig);
export default getFirestore(firebaseApp);
