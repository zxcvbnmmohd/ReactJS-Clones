import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/userSlice';
import Chat from '../pages/home/chat/Chat';
import Users from '../pages/home/users/Users';
import Sidebar from '../pages/home/sidebar/Sidebar';
import Login from '../pages/login/Login';
import { auth } from '../firebase';
import { login, logout } from '../redux/userSlice'
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
            <Users />
            <Sidebar />
            <Chat />
          </>
        ) : (
            <Login />
          )
      }

    </div>
  );
}

export default App;
