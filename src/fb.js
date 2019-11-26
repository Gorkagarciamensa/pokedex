import firebase from "firebase/app";

import "firebase/database";
import "firebase/auth";
import store from "./store";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBXS-QJnzsyLm5OT9dUT6FCxZu0ok4h6iY",
  authDomain: "poke-project-792c4.firebaseapp.com",
  databaseURL: "https://poke-project-792c4.firebaseio.com",
  projectId: "poke-project-792c4",
  storageBucket: "poke-project-792c4.appspot.com",
  messagingSenderId: "576061643667",
  appId: "1:576061643667:web:d3b1aa317f3763fd982666"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const fb = firebase;

export default fb;
