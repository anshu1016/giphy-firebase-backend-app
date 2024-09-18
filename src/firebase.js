// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCF1ODtDCbV8pjE3FkqqlYJ0smKvv-gWvg",
  authDomain: "giphyapp-8faac.firebaseapp.com",
  projectId: "giphyapp-8faac",
  storageBucket: "giphyapp-8faac.appspot.com",
  messagingSenderId: "471424823242",
  appId: "1:471424823242:web:17fe9908561b0fdc9a6933",
  measurementId: "G-E30BWBK97P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the auth instance
export const auth = getAuth(app);
export default app;
