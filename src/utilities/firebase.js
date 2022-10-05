import { initializeApp } from 'firebase/app';
import { useEffect, useState, useCallback } from 'react';
import { getDatabase, onValue, ref, update } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDxjqsE4Q85sUuxInVtudz-MHcii9qq6AA",
  authDomain: "cs-397-react-tutorial.firebaseapp.com",
  databaseURL: "https://cs-397-react-tutorial-default-rtdb.firebaseio.com",
  projectId: "cs-397-react-tutorial",
  storageBucket: "cs-397-react-tutorial.appspot.com",
  messagingSenderId: "615413121105",
  appId: "1:615413121105:web:66ba7b380082e39ded3870",
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

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
