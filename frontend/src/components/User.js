import React from 'react';
import { db, fb } from '../context/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';

function User() {
  const [value, loading, error] = useDocument(db.doc(`userDetails/${fb.auth().currentUser.uid}`));
  
  return (
    <>
      { error && <strong>Error: {JSON.stringify(error)}</strong> }
      { loading && <span>Document: Loading...</span> }
      { value &&<h1>Welcome {value.data().firstName}</h1> }
    </>
  )
}

export default User;