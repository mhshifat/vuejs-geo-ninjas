import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBdgt9b2CpR5Kpvn6gC7JNWjuVw7x5WXI8",
  authDomain: "vuejs-geo-ninjas.firebaseapp.com",
  databaseURL: "https://vuejs-geo-ninjas.firebaseio.com",
  projectId: "vuejs-geo-ninjas",
  storageBucket: "vuejs-geo-ninjas.appspot.com",
  messagingSenderId: "236501487125"
};
firebase.initializeApp(config);

export const db = firebase.firestore();
export const fireAuth = firebase.auth();
