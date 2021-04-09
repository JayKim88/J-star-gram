import firebase from "firebase/app";
import "firebase/storage"; //store images
import "firebase/firestore"; //database
import "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBbUtdKCZqlOfa3U-PWLeFvE0LascCnLUw",
  authDomain: "j-star-gram.firebaseapp.com",
  projectId: "j-star-gram",
  storageBucket: "j-star-gram.appspot.com",
  messagingSenderId: "1088533633979",
  appId: "1:1088533633979:web:8734c62f235b2d3944429e",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
const projectStorage = firebase.storage(); //This reference points to the root of Cloud Storage bucket.
const projectFirestore = firebase.firestore();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;
const projectAuth = firebase.auth();

export { projectStorage, projectFirestore, timeStamp, projectAuth };
