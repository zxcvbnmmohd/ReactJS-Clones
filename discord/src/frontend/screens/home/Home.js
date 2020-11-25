import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage } from "../../../backend/redux/reducers/appReducer";
import { getCurrentUser } from "../../../backend/redux/reducers/authReducer";
import {
  addServer,
  updateServer,
  removeServer,
  getCurrentServer,
} from "../../../backend/redux/reducers/serversReducer";
import firestore from "../../../backend/configs/firebase";
import Servers from "./components/servers/Servers";
import Dashboard from "./components/sidebar/dashboard/Dashboard";
import Server from "./components/sidebar/server/Server";
import Channel from "./components/sections/channel/Channel";
import Friends from "./components/sections/friends/Friends";
import Settings from "./components/sections/settings/Settings";

import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const currentPage = useSelector(getCurrentPage);
  const currentServer = useSelector(getCurrentServer);

  useEffect(() => {
    console.log("useEffect");
    
    const unsubscribe = () =>
      firestore
        .collection("servers")
        .onSnapshot((snapshot) => {
          console.log("Started");
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              console.log("New Server: ", change.doc.data());

              const server = {
                serverID: change.doc.id,
              };

              dispatch(addServer(server));
            }
            if (change.type === "modified") {
              console.log("Modified Server: ", change.doc.data());

              dispatch(
                updateServer({
                  serverID: change.doc.id,
                  ...change.doc.data(),
                })
              );
            }
            if (change.type === "removed") {
              console.log("Removed Server: ", change.doc.data());

              dispatch(
                removeServer({
                  serverID: change.doc.id,
                  ...change.doc.data(),
                })
              );
            }
          });
        });

    unsubscribe();
  }, []);

  function renderScreen(param) {
    switch (param) {
      case "Friends":
        return <Friends />;
      case "Settings":
        return <Settings />;
      default:
        return <Channel />;
    }
  }

  return <div className="home">
    <Servers />
    {
      currentServer === null
        ? <Dashboard />
        : <Server />
    }
    {
      renderScreen(currentPage)
    }
  </div>;
}

export default Home;
