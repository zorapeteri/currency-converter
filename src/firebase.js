import firebase from 'firebase/app';
import firebaseConfig from './firebaseConfig';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const basicAdditionalData = {
  baseCurrency: 'USD',
  savedCurrencies: [],
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export const auth = firebase.auth();

export const storage = firebase.storage();

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const signInWithEmailAndPassword = (email, password) => {
  auth.signInWithEmailAndPassword(email, password).catch(error => {
    var errorCode = error.code;
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong email or password.');
    }
    console.error({ error });
  });
};

export const createUserProfileDocument = async (user, additonalData = basicAdditionalData) => {
  if (!user) return null;

  const userRef = firestore.collection('users').doc(user.uid);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const createdAt = new Date();
    const { displayName, email, photoURL } = user;

    try {
      await userRef.set({
        displayName: displayName ? displayName : email,
        email,
        photoURL,
        createdAt,
        ...additonalData,
      });
    } catch (error) {
      console.error({ error });
    }
  }

  return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.collection('users').doc(uid);
    return userDocument;
  } catch (error) {
    console.error({ error });
  }
};

export default firebase;
