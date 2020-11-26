import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage } from "../../../backend/redux/reducers/appReducer";
import { getCurrentUser } from "../../../backend/redux/reducers/authReducer";
import { getCurrentChannel } from "../../../backend/redux/reducers/channelsReducer";
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
  const currentChannel = useSelector(getCurrentChannel);

  const serversCollection = firestore.collection("servers");
  const serversQuery = serversCollection.where("members", "array-contains-any", [currentUser.userID]);

  useEffect(() => {
    console.log("useEffect");
    const unsubscribe = serversQuery.onSnapshot((snapshot) => {
      console.log("Started");

      snapshot.docChanges().forEach((change) => {
        const server = {
          serverID: change.doc.id,
          ownerID: change.doc.data().ownerID,
          name: change.doc.data().name,
          members: change.doc.data().members,
          categories: change.doc.data().categories,
        };

        if (change.type === "added") {
          console.log("New Server: ", server.serverID);
          dispatch(addServer(server));
        }
        if (change.type === "modified") {
          console.log("Modified Server: ", server.serverID);
          dispatch(updateServer(server));
        }
        if (change.type === "removed") {
          console.log("Removed Server: ", server.serverID);
          dispatch(removeServer(server));
        }
      });
    });

    return () => {
      unsubscribe();
    };
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

  return (
    <div className="home">
      <Servers />
      {currentServer === null ? <Dashboard /> : <Server />}
      {currentServer === null ? renderScreen(currentPage) : currentChannel === null ? <></> : <Channel />}
    </div>
  );
}

export default Home;
