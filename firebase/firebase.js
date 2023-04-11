import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDMjUNUuSiPxNJeLsayTAvj9rvhiHedjjU",
  authDomain: "ice-break-app.firebaseapp.com",
  projectId: "ice-break-app",
  storageBucket: "ice-break-app.appspot.com",
  messagingSenderId: "269878406421",
  appId: "1:269878406421:web:20674704fd07a12d454d1c",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const rdb = firebase.database();

export { auth, db, storage, rdb };
