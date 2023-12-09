import firebase from 'firebase';


  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD3e9_W-7phYvhCuF4_rubsioZ__0opdSQ",
    authDomain: "instagram-48d17.firebaseapp.com",
    databaseURL: "https://instagram-48d17-default-rtdb.firebaseio.com",
    projectId: "instagram-48d17",
    storageBucket: "instagram-48d17.appspot.com",
    messagingSenderId: "575584755180",
    appId: "1:575584755180:web:71e7cffa10625ce06434c9",
    measurementId: "G-CPFXHVGWR6"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

  export {db,auth,storage};