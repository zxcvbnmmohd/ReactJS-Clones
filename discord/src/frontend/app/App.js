import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, login, logout } from '../../backend/redux/reducers/authReducer';
import { auth } from '../../backend/configs/firebase';

import Home from '../screens/home/Home';
import Login from '../screens/auth/login/Login';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  
  useEffect(() => {
    auth.onAuthStateChanged((onUser) => {
      if (onUser) {
        dispatch(login({
          userID: onUser.uid,
          selfie: onUser.photoURL,
          email: onUser.email,
          name: onUser.displayName,
        }));
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      {
        user ? (
          <>
            <Home />
          </>
        ) : (
            <Login />
          )
      }

    </div>
  );
}

export default App;
