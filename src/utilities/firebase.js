import { initializeApp } from 'firebase/app';
import { useEffect, useState } from 'react';
import { getDatabase, onValue, ref } from 'firebase/database';

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
  ), [ path ]);

  return [ data, error ];
};
