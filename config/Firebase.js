import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCYLuU3qxYJz903cV5rFNkcayl81Dfg6y0",
    authDomain: "yesorno-by-mic.firebaseapp.com",
    databaseURL: "https://yesorno-by-mic.firebaseio.com",
    projectId: "yesorno-by-mic",
    storageBucket: "",
    messagingSenderId: "346180944520",
    appId: "1:346180944520:android:dfd56afb6f9a02f674553d",
  };

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;