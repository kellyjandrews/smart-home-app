import React from 'react';
import { useAuth } from '../context/firebase';
import User from './User';
import Login from './Login';
import PhoneNumbers from './PhoneNumbers/PhoneNumbers';

import 'spectre.css';
import '@fortawesome/fontawesome-svg-core/styles.css'


function renderSwitch(u,i,e) {
  if (i) return <div className="loading loading-lg"></div>
  if (e) return <h1>Error!</h1>
  if (u) return (
    <>
      <User />
      <PhoneNumbers />
    </>)
  return <Login />
}

function App() {
  const { user, initializing, error } = useAuth();
  return (
    <div className="container">
      {renderSwitch(user, initializing, error)}
    </div>
  )
}

export default App;
