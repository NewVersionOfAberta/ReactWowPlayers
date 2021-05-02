import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD9dw8a-RRkw3wmISYNLzaEEY7SAMo0LwU",
  authDomain: "wowplayers-79176.firebaseapp.com",
  projectId: "wowplayers-79176",
  storageBucket: "wowplayers-79176.appspot.com",
  messagingSenderId: "1003885976888",
  appId: "1:1003885976888:web:091e3ceacc6ff486c8b5cd",
  measurementId: "G-measurement-id",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const Firebase = firebase;

export default Firebase;
