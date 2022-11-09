import { initializeApp } from 'firebase/app';
import { useEffect, useState, useCallback } from 'react';
import { connectDatabaseEmulator, getDatabase, onValue, ref, update } from 'firebase/database';
import { connectAuthEmulator, signInWithCredential, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDxjqsE4Q85sUuxInVtudz-MHcii9qq6AA",
  authDomain: "cs-397-react-tutorial.firebaseapp.com",
  databaseURL: "https://cs-397-react-tutorial.firebaseio.com",
  projectId: "cs-397-react-tutorial",
  storageBucket: "cs-397-react-tutorial.appspot.com",
  messagingSenderId: "615413121105",
  appId: "1:615413121105:web:66ba7b380082e39ded3870",
};

const firebase = initializeApp(firebaseConfig)
const auth = getAuth(firebase);
const database = getDatabase(firebase);

if (process.env.REACT_APP_EMULATE) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectDatabaseEmulator(database, "127.0.0.1", 9000);

  signInWithCredential(auth, GoogleAuthProvider.credential(
    '{"sub": "dc408DAXfZ38GcpQBDang7xcpjJR", "email": "tester@gmail.com", "displayName":"Test User", "email_verified": true}'
  ));
}

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
     setData( snapshot.val() );
    }, (error) => {
      setError(error);
    })
  ), [path]);

  return [data, error];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
  }, [path]);

  return [updateData, result];
};

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => {
  signOut(getAuth(firebase));
  if (window.location.pathname.includes("editCourse")) {
    window.location.href = "/";
  };
};

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => (
    onAuthStateChanged(getAuth(firebase), setUser)
  ), []);

  return [user];
};
