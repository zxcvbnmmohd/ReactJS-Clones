import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import firestore, { auth } from "../../../../../../backend/configs/firebase";
import {
  isMicOn, setMicOn, setMicOff,
} from "../../../../../../backend/redux/reducers/appReducer";
import {
  getCurrentUser
} from "../../../../../../backend/redux/reducers/authReducer";
import {
  addChannel,
  updateChannel,
  removeChannel,
  clearChannels,
  setCurrentChannel,
  getChannels,
  getCurrentChannel,
} from "../../../../../../backend/redux/reducers/channelsReducer";
import {
  getCurrentServer
} from "../../../../../../backend/redux/reducers/serversReducer";

import { Avatar } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from '@material-ui/icons/MicOff';
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";

import ChannelItem from "./channelItem/ChannelItem.js";

import "./Server.css";

function Server() {
  const dispatch = useDispatch();
  const mic = useSelector(isMicOn);
  const currentUser = useSelector(getCurrentUser);
  const channels = useSelector(getChannels);
  const currentChannel = useSelector(getCurrentChannel);
  const currentServer = useSelector(getCurrentServer);

  const channelsCollection = firestore.collection("servers").doc(currentServer.serverID).collection("channels");
  const channelsQuery = channelsCollection;

  useEffect(() => {
    console.log("useEffect");
    var unsubscribe = channelsQuery.onSnapshot((snapshot) => {
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
          if (currentChannel === null) {
            console.log("Yo");
            dispatch(setCurrentChannel(channel));
          }
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
    <div className="server">
      <div className="server__top">
        <h5>{currentServer.name}</h5>
        <ExpandMoreIcon />
      </div>

      <div className="server__mid">
        {
          currentServer.categories.map((category) => (
            <div key={category} className="server__mid__head">
              <div className="server__mid__head__drop">
                <ExpandMoreIcon />
                <h4>{category}</h4>
              </div>
              <AddIcon
                className="server__mid__head__add"
                onClick={() => handleAddNewChannel({ category })}
              />
            </div>
          ))
        }


        <div className="server__mid__channels">
          {channels.map((channel) => (
            <ChannelItem
              key={channel.channelID}
              current={currentChannel === channel}
              channel={channel}
            />
          ))}
        </div>

      </div>

      <div className="server__btm">
        <Avatar
          className="server__btm__selfie"
          src={currentUser.selfie}
          onClick={() => {
            auth.signOut();
          }}
        />
        <div className="server__btm__texts">
          <h5>{currentUser.name}</h5>
          <h6>#{currentUser.userID.substring(0, 5)}</h6>
        </div>
        <div className="dashbaord__btm__icons">
          {
            mic
              ? <MicIcon className="server__btm__icons__icon" onClick={() => dispatch(setMicOff())} />
              : <MicOffIcon className="server__btm__icons__icon" onClick={() => dispatch(setMicOn())} />
          }
          <HeadsetIcon className="server__btm__icons__icon" />
          <SettingsIcon className="server__btm__icons__icon" />
        </div>
      </div>
    </div>
  );
}

export default Server;
