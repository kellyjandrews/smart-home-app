import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import FirebaseProvider from './context/firebase';

ReactDOM.render(
  <FirebaseProvider>
    <App />
  </FirebaseProvider>,
document.getElementById('root'));
