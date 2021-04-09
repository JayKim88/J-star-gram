import firebase from "firebase/app";
import "firebase/storage"; //store images
import "firebase/firestore"; //database
import "firebase/auth";
import dotenv from "dotenv";
dotenv.config();
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGESENDER,
  appId: process.env.REACT_APP_APPID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
const projectStorage = firebase.storage(); //This reference points to the root of Cloud Storage bucket.
const projectFirestore = firebase.firestore();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;
const projectAuth = firebase.auth();

export { projectStorage, projectFirestore, timeStamp, projectAuth };
