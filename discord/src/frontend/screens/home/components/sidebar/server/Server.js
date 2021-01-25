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
  setCurrentChannel,
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

  const [categories, setCategory] = useState([]);
  const [channels, setChannel] = useState([]);

  const addCategory = (v) => {
    setCategory(categories.concat(v));
  };
  const addChannel = (v) => {
    setChannel(channels.concat(v));
  };

  // const addCategory = (k, v) => {
  //   setCategory(prev => new Map([...prev, [k, v]]));
  // };

  // const upsertCategory = (k, v) => {
  //   setCategory(prev => new Map(prev).set(k,v));
  // };

  // const deleteCategory = (k, v) => {
  //   setCategory(prev => {
  //     const newchannel = new Map(prev);
  //     newchannel.delete(k);
  //     return newchannel;
  //   });
  // };

  const clearCategories = () => {
    setCategory([]);
  }

  const channelsQuery = channelsCollection(currentServer.serverID);

  useEffect(() => {
    console.log("useEffect");
    var unsubscribe = channelsQuery.onSnapshot((snapshot) => {
      console.log("Started");

      clearCategories();

      snapshot.docChanges().forEach((change) => {
        const channel = {
          channelID: change.doc.id,
          type: change.doc.data().type,
          name: change.doc.data().name,
          category: change.doc.data().category,
        };

        if (change.type === "added") {
          console.log("New Category: ", channel.channelID);

          if (categories != null) {
            if (categories.includes(channel.category)) {
              console.log('Category Exists');
            } else {
              addCategory(channel.category);
              console.log('Added to new category');
            }
          } else {
            addCategory(channel.category);
            console.log('Added to existing category 2');
            // console.log(channel.size);
          }

          addChannel(channel);

          // dispatch(updateServer(cs));
          // dispatch(setCurrentChannel(channel));      
        }
        if (change.type === "modified") {
          console.log("Modified Category: ", channel.CategoryID);
          // dispatch(updateCategory(Category));
        }
        if (change.type === "removed") {
          console.log("Removed Category: ", channel.CategoryID);
          // dispatch(removeCategory(Category));
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
        {categories.map(key => (
          <div key={key} className="server__mid__head">
            <div className="server__mid__head__drop">
              <ExpandMoreIcon />
              <h4>{key}</h4>
            </div>
            <AddIcon
              className="server__mid__head__add"
              onClick={() => handleAddNewCategory({ key })}
            />
            {
             channels.map(channel => {
              <ChannelItem
                  key={channel.CategoryID}
                  current={currentChannel === channel}
                  Category={channel}
                />
             }) 
            }
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
