import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Avatar } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HeadsetIcon from "@material-ui/icons/Headset";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import SettingsIcon from "@material-ui/icons/Settings";

import {
  auth,
  isMicOn,
  setMicOn,
  setMicOff,
  // setCurrentChannel,
  getCurrentChannel,
  getCurrentUser,
  getCurrentServer,
  channelsCollection,
} from "../../../../../../backend";

import ChannelItem from "./channelItem/ChannelItem.js";

import "./Server.css";

function Server() {
  const dispatch = useDispatch();

  const mic = useSelector(isMicOn);
  const currentUser = useSelector(getCurrentUser);
  const currentServer = useSelector(getCurrentServer);
  const currentChannel = useSelector(getCurrentChannel);

  const [channels, setChannel] = useState([]);

  const addChannel = (key, c) => {
    setChannel((arr) => [...arr, { key: key, name: c.category, channels: [c] }]);
  };

  const clearChannels = () => {
    setChannel([]);
  };

  const channelsQuery = channelsCollection(currentServer.serverID);

  useEffect(() => {
    console.log("useEffect");
    var unsubscribe = channelsQuery.onSnapshot((snapshot) => {
      console.log("Started");

      clearChannels();

      snapshot.docChanges().forEach((change) => {
        var i = 0;
        const channel = {
          channelID: change.doc.id,
          type: change.doc.data().type,
          name: change.doc.data().name,
          category: change.doc.data().category,
        };

        if (change.type === "added") {
          console.log("New Category: ", channel.category);
          console.log("New Channel: ", channel.name);

          addChannel(i, channel);
          console.log('STATE: ', channels);
          i++;
        }
        if (change.type === "modified") {
          console.log("Modified Category: ", channel.category);
        }
        if (change.type === "removed") {
          console.log("Removed Category: ", channel.category);
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleAddNewCategory = (category) => {
    const name = prompt("Create new Category");

    if (name) {
      channelsCollection(currentServer.serverID).add({
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
        {channels.map((category) => (
          <div>
            <div key={category.key} className="server__mid__head">
              <div className="server__mid__head__drop">
                <ExpandMoreIcon />
                <h4>{category.name}</h4>
              </div>
              <AddIcon
                className="server__mid__head__add"
                onClick={() => handleAddNewCategory({ category })}
              />
              {category.channels.map((channel) => {
              <span key={channel.channelID}>#213</span>;
              // <ChannelItem
              //   // key={channel.categoryID}
              //   current={false}
              //   channel={channel}
              // />;
            })}
            </div>
            
          </div>
        ))}
      </div>

      <div className="server__btm">
        <Avatar
          className="server__btm__selfie"
          src={currentUser.selfie}
          onClick={() => auth.signOut()}
        />
        <div className="server__btm__texts">
          <h5>{currentUser.name}</h5>
          <h6>#{currentUser.userID.substring(0, 5)}</h6>
        </div>
        <div className="server__btm__icons">
          {mic ? (
            <MicIcon
              className="server__btm__icons__icon"
              onClick={() => dispatch(setMicOff())}
            />
          ) : (
            <MicOffIcon
              className="server__btm__icons__icon"
              onClick={() => dispatch(setMicOn())}
            />
          )}
          <HeadsetIcon className="server__btm__icons__icon" />
          <SettingsIcon className="server__btm__icons__icon" />
        </div>
      </div>
    </div>
  );
}

export default Server;
