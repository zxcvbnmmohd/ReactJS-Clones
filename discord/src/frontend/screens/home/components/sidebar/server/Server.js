import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import firestore, { auth } from "../../../../../../backend/configs/firebase";
import {
  addChannel,
  updateChannel,
  removeChannel,
  clearChannels,
  setCurrentChannel,
  getChannels,
  getCurrentChannel,
} from "../../../../../../backend/redux/reducers/channelsReducer";
import { getCurrentServer } from "../../../../../../backend/redux/reducers/serversReducer";
import { getCurrentUser } from "../../../../../../backend/redux/reducers/authReducer";

import { Avatar } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MicIcon from "@material-ui/icons/Mic";
// import MicOffIcon from '@material-ui/icons/MicOff';
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";

import Channels from "./channels/Channels.js";

import "./Server.css";

function Server() {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);

  const currentServer = useSelector(getCurrentServer);
  const channels = useSelector(getChannels);
  const currentChannel = useSelector(getCurrentChannel);

  useEffect(() => {
    console.log("useEffect");
    var unsubscribe = firestore
      .collection("servers")
      .doc(currentServer.serverID)
      .collection("channels")
      .onSnapshot((snapshot) => {
        console.log("Started");

        dispatch(clearChannels());

        snapshot.docChanges().forEach((change) => {
          const channel = {
            channelID: change.doc.id,
            type: change.doc.data().type,
            name: change.doc.data().name,
            users: change.doc.data().users,
            categories: change.doc.data().categories,
          };

          if (change.type === "added") {
            console.log("New Server: ", channel.channelID);
            if (currentChannel === null) dispatch(setCurrentChannel(channel));
            dispatch(addChannel(channel));
          }
          if (change.type === "modified") {
            console.log("Modified Server: ", channel.channelID);
            dispatch(updateChannel(channel));
          }
          if (change.type === "removed") {
            console.log("Removed Server: ", channel.channelID);
            dispatch(removeChannel(channel));
          }
        });
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleAddNewChannel = (category) => {
    const name = prompt("Create new channel");

    if (name) {
      firestore
        .collection("servers")
        .doc(currentServer.serverID)
        .collection("channels")
        .add({
          name: name,
          members: [currentUser.userID],
          type: "Text",
          category: category,
        });
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard__top">
        <h5>{currentServer.name}</h5>
        <ExpandMoreIcon />
      </div>

      <div className="dashboard__mid">
        <div className="dashboard__mid__head">
          <div className="dashboard__mid__head__drop">
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>
          <AddIcon
            className="server__mid__head__add"
            onClick={() => handleAddNewChannel("Text Channels")}
          />
        </div>

        <div className="dashboard__mid__channels">
          {Channels.map((channel) => (
            <Channels
              key={channel.channelID}
              current={currentChannel === channel}
              channel={channel}
            />
          ))}
        </div>

        <div className="dashboard__mid__head">
          <div className="dashboard__mid__head__drop">
            <ExpandMoreIcon />
            <h4>Voice Channels</h4>
          </div>
          <AddIcon
            className="dashboard__mid__head__add"
            onClick={() => handleAddNewChannel("voice")}
          />
        </div>

        <div className="dashboard__mid__channels">
          {Channels.map((channel) => (
            <Channels
              key={channel.channelID}
              current={currentChannel === channel}
              channel={channel}
            />
          ))}
        </div>
      </div>

      <div className="dashboard__btm">
        <Avatar
          className="dashboard__btm__selfie"
          src={currentUser.selfie}
          onClick={() => {
            auth.signOut();
          }}
        />
        <div className="dashboard__btm__texts">
          <h5>{currentUser.name}</h5>
          <h6>#{currentUser.userID.substring(0, 5)}</h6>
        </div>
        <div className="dashbaord__btm__icons">
          <MicIcon className="dashboard__btm__icons_icon" />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
}

export default Server;
