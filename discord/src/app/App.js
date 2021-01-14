import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  auth,
  getCurrentUser,
  setCurrentUser,
  nullCurrentUser,
} from "../backend";

import { Auth, Home } from "../frontend/screens";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);

  useEffect(() => {
    auth.onAuthStateChanged((onUser) => {
      if (onUser) {
        dispatch(
          setCurrentUser({
            userID: onUser.uid,
            selfie: onUser.photoURL,
            email: onUser.email,
            name: onUser.displayName,
          })
        );
      } else {
        dispatch(nullCurrentUser());
      }
    });
  }, []);

  return (
    <div className="app">
      {currentUser ? (
        <>
          <Home />
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;
