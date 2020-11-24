import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../backend/redux/reducers/authReducer";
import {
  addServer,
  updateServer,
  removeServer,
  setCurrentServer,
  getCurrentServer,
} from "../../../backend/redux/reducers/serversReducer";
import firestore from "../../../backend/configs/firebase";
import Servers from "./components/servers/Servers";
import Server from "./components/server/Server";
import Channel from "./components/channel/Channel";

import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const currentServer = useSelector(getCurrentServer);

  useEffect(() => {
    console.log("useEffect");

    const unsubscribe = firestore.collection("servers").onSnapshot((snapshot) => {
      console.log("Started");
      
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New Server: ", change.doc.data());

          const server = {
            serverID: change.doc.id,
          };

          if (currentServer === null) dispatch(setCurrentServer(server));
          dispatch(addServer(server));
        }
        if (change.type === "modified") {
          console.log("Modified Server: ", change.doc.data());

          dispatch(updateServer({
            serverID: change.doc.id,
            ...change.doc.data(),
          }));
        }
        if (change.type === "removed") {
          console.log("Removed Server: ", change.doc.data());

          dispatch(removeServer({
            serverID: change.doc.id,
            ...change.doc.data(),
          }));
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (

    currentServer === null ? <div></div> : <div className="home">
      <Servers />
      <Server />
      <Channel />
    </div>

  );
}

export default Home;
