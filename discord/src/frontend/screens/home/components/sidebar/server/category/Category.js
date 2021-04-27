import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {
  setCurrentChannel,
  getCurrentChannel,
  getCurrentUser,
  getCurrentServer,
  channelsCollection,
} from "../../../../../../../backend";

import ChannelItem from "./channelItem/ChannelItem.js";

import "./Category.css";

function Category({ category }) {
  const dispatch = useDispatch();

  const currentUser = useSelector(getCurrentUser);
  const currentServer = useSelector(getCurrentServer);
  const currentChannel = useSelector(getCurrentChannel);

  const [channels, setChannel] = useState([]);

  const addChannel = (c) => {
    setChannel((arr) => [
      ...arr,
      c,
    ]);
  };

  const clearChannels = () => {
    setChannel([]);
  };

  useEffect(() => {
    console.log("useEffect");

    const channelsQuery = channelsCollection(currentServer.serverID, category);

    var unsubscribe = channelsQuery.onSnapshot((snapshot) => {
      console.log("Started");
      console.log(category);
      
      clearChannels();

      snapshot.docChanges().forEach((change) => {
        const channel = {
          channelID: change.doc.id,
          type: change.doc.data().type,
          name: change.doc.data().name,
          category: change.doc.data().category,
          isPrimary: change.doc.data().isPrimary,
        };

        if (change.type === "added") {
          addChannel(channel);
          if (channel.isPrimary) dispatch(setCurrentChannel(channel));
        }
        if (change.type === "modified") {
          console.log("Modified Category: ", channel.category);
        }
        if (change.type === "removed") {
          console.log("Removed Category: ", channel.category);
        }
      });

      console.log("STATE: ", channels);
    });

    return () => {
      unsubscribe();
    };
  }, [currentServer]);

  const handleAddNewChannel = (category) => {
    const name = prompt("Create new Channel");

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
    <div className="category">
      <div className="category__mid__head">
        <div className="category__mid__head__drop">
          <ExpandMoreIcon />
          <h4>{category}</h4>
        </div>
        <AddIcon
          className="category__mid__head__add"
          onClick={() => handleAddNewChannel({ category })}
        />
      </div>

      {/* {channels.map((channel) => {
        return (
          <div key={channel.channelID}>
            <ChannelItem
              current={
                currentChannel === null
                  ? false
                  : currentChannel.channelID === channel.channelID
              }
              channel={channel}
            />
          </div>
        );
      })} */}
    </div>
  );
}

export default Category;
