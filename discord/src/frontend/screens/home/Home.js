import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../../backend/redux/reducers/authReducer";
import {
  addServer,
  updateServer,
  removeServer,
  setCurrentServer,
  getCurrentServer,
} from "../../../backend/redux/reducers/serversReducer";
import firestore from "../../../backend/configs/firebase";
import Servers from "./components/servers/Servers";
import Dashboard from "./components/sidebar/dashboard/Dashboard";
import Server from "./components/sidebar/server/Server";
import Channel from "./components/channel/Channel";

import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const currentServer = useSelector(getCurrentServer);

  useEffect(() => {
    console.log("useEffect");
    const unsubscribe = () =>
      firestore
        .collection("servers")
        .where("users", "array-contains-any", [currentUser.userID])
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

  return <div className="home">
    <Servers />
    {currentServer === null ? <Dashboard /> : <Server />}
    <Channel />
  </div>;
}

export default Home;
