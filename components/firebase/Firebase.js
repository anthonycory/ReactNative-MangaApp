import React from 'react'
import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAHAx84kuGkXFVIb1LDJriHe-s5RkPvK6Y",
    authDomain: "appmanga-e2db8.firebaseapp.com",
    databaseURL: "https://appmanga-e2db8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "appmanga-e2db8",
    storageBucket: "appmanga-e2db8.appspot.com",
    messagingSenderId: "500567649062",
    appId: "1:500567649062:web:3ca8e6b1d77f395fadafe7"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;