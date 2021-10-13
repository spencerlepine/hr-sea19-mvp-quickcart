import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import config from "./config";

const app = firebase.initializeApp(config.firebaseConfig);
export default app;

export const db = firebase.firestore();
export const auth = app.auth();
// export const storage = firebase.storage();
// const googleProvider = new firebase.auth.GoogleAuthProvider();
