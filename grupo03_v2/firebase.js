// firebase.js

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC_ptEPIiW2XDk-KjYLXR_TAWqYrOzOIo8",
    authDomain: "teste-bda-bd4a5.firebaseapp.com",
    projectId: "teste-bda-bd4a5",
    storageBucket: "teste-bda-bd4a5.appspot.com",
    messagingSenderId: "872852791013",
    appId: "1:872852791013:web:08a8737e7efbee82c37e0c",
    measurementId: "G-4XS3VXWN9Y"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
