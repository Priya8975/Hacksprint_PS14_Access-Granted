import * as firebase from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQxDlPQmToV3bco-hfOCnp2AWvPq_y-Zc",
  authDomain: "bikezilla-9fd9d.firebaseapp.com",
  projectId: "bikezilla-9fd9d",
  storageBucket: "bikezilla-9fd9d.appspot.com",
  messagingSenderId: "751150079493",
  appId: "1:751150079493:web:5f1e62db97c307126d466c"
};


const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth();

export default app;

