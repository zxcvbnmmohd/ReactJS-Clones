import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../backend/redux/reducers/authReducer";
import {
  addServers,
  setCurrentServer,
  getServers,
  getCurrentServer,
} from "../../../backend/redux/reducers/serversReducer";
import {
  addTextChannels,
  addVoiceChannels,
  setCurrentChannel,
  getTextChannels,
  getVoiceChannels,
  getCurrentChannel,
} from "../../../backend/redux/reducers/channelsReducer";
import firestore from "../../../backend/configs/firebase";
import Servers from "./components/servers/Servers";
import Server from "./components/server/Server";
import Channel from "./components/channel/Channel";

import "./Home.css";

function Home() {
  const dispatch = useDispatch();

  const currentUser = useSelector(getUser);

  const servers = useSelector(getServers);
  const currentServer = useSelector(getCurrentServer);

  const textChannels = useSelector(getTextChannels);
  const voiceChannels = useSelector(getVoiceChannels);
  const currentChannel = useSelector(getCurrentChannel);

  //   const [servers, setServers] = useState([]);
  //   const [textChannels, setTextChannels] = useState([]);
  //   const [voiceChannels, setVoiceChannels] = useState([]);

  //   const [selectedServer, setSelectedServer] = useState();
  //   const [selectedChannel, setSelectedChannel] = useState();

  useEffect(() => {
    const serversSnapshot = firestore.collection("servers").onSnapshot((ds) =>
      dispatch(
        addServers(
          ds.docs.map((doc) => ({
            serverID: doc.id,
            ...doc.data(),
          }))
        )
      )
    );

    // const channelsSnapshot = firestore
    //   .collection("servers")
    //   .doc(servers.first.serverID)
    //   .onSnapshot((ds) =>
    //     ds.data().type === "voice"
    //       ? dispatch(
    //           addVoiceChannels(
    //             ds.docs.map((doc) => ({
    //               channelID: doc.id,
    //               ...doc.data(),
    //             }))
    //           )
    //         )
    //       : dispatch(
    //           addTextChannels(
    //             ds.docs.map((doc) => ({
    //               channelID: doc.id,
    //               ...doc.data(),
    //             }))
    //           )
    //         )
    //   );

    // serversSnapshot.unsubscribe();
    // channelsSnapshot.unsubscribe();
  }, []);

  return (
    <div className="home">
      <Servers
        currentUser={currentUser}
        servers={servers}
        selectedServer={currentServer === null ? servers.first : currentServer}
        setSelectedServer={setCurrentServer}
      />
      <Server
        currentUser={currentUser}
        selectedServer={currentServer === null ? servers.first : currentServer}
        textChannels={textChannels}
        voiceChannels={voiceChannels}
        selectedChannel={currentChannel}
        setSelectedChannel={(c) => setCurrentChannel(c)}
      />
      <Channel currentUser={currentUser} currentChannel={currentChannel} />
    </div>
  );
}

export default Home;
