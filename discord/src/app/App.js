import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { auth, getCurrentUser, setCurrentUser, nullCurrentUser } from '../backend';

import Home from '../frontend/screens/home/Home';
import Auth from '../frontend/screens/auth/Auth';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  
  useEffect(() => {
    auth.onAuthStateChanged((onUser) => {
      if (onUser) {
        dispatch(setCurrentUser({
          userID: onUser.uid,
          selfie: onUser.photoURL,
          email: onUser.email,
          name: onUser.displayName,
        }));
      } else {
        dispatch(nullCurrentUser());
      }
    });
  }, []);

  return (
    <div className='app'>
      {
        currentUser ? (
          <>
            <Home />
          </>
        ) : (
            <Auth />
          )
      }
    </div>
  );
}

export default App;
